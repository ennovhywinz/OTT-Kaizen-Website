        function toggleMenu() {
            document.getElementById("menu").classList.toggle("show");
        }

        document.addEventListener('DOMContentLoaded', async function () {
            const video = document.getElementById('video-player');
            const uiContainer = document.getElementById('video-container');
            const player = new shaka.Player(video);
            const ui = new shaka.ui.Overlay(player, uiContainer, video);
        
        const config = {
            'overflowMenuButtons' : ['quality', 'language', 'captions', 'playback_rate', 'cast']
        }
        ui.configure(config)
        
        const pipButton = document.createElement('button');
        pipButton.classList.add('shaka-pip-button');
        pipButton.innerHTML = 'PiP';
        pipButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 8px 12px;
            background: #ECECBA;
            color: black;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            z-index: 1000;
        `;
        
        pipButton.addEventListener('click', async () => {
            try {
                if (document.pictureInPictureElement) {
                    await document.exitPictureInPicture();
                    } else {
                        await video.requestPictureInPicture();
                        }
                    } catch (error) {
                        console.error('Error toggling PiP mode:', error);
                        }
                    });
                    
        uiContainer.appendChild(pipButton);
        
        video.addEventListener('leavepictureinpicture', () => {
            video.play();
        });
        
        async function loadStream(manifestUrl, key = null) {
            try {
                await player.unload();
                const config = key ? { drm: { clearKeys: parseClearKey(key) } } : {};
                player.configure(config);
                await player.load(manifestUrl);
                video.play();
            } catch (error) {
                console.error('Error loading stream:', error);
                }
            }
            
        function parseClearKey(keyString) {
            const keyObject = {};
            keyString.split(',').forEach(pair => {
                const [keyId, key] = pair.split(':');
                keyObject[keyId] = key;
            });
            return keyObject;
        }
        
        const channelData = [
            {
                src: "https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/tv5_hd.mpd",
                img: "https://i.imgur.com/yukSStN.png",
                name: "TEST",
                key: "2615129ef2c846a9bbd43a641c7303ef:07c7f996b1734ea288641a68e1cfdc4d"
            },
            {
                src: "https://qp-pldt-live-grp-07-prod.akamaized.net/out/u/cg_onesports_hd.mpd",
                img: "https://i.imgur.com/yukSStN.png",
                name: "TEST",
                key: "53c3bf2eba574f639aa21f2d4409ff11:3de28411cf08a64ea935b9578f6d0edd"
            },
            {
                src: "https://jungotvstream-chanall.akamaized.net/jungotv/hallypop/stream.m3u8",
                img: "https://i.imgur.com/yukSStN.png",
                name: "TEST"
            },
        ];

            let currentPage = 0;
            const pageSize = 12;
			let activeTile = null;
			let activeTileIndex = null;
			
		function renderChannels() {
		    const selector = document.getElementById('channel-selector');
		    selector.innerHTML = '';
		    
		    const start = currentPage * pageSize;
		    const end = start + pageSize;
		    const tiles = channelData.slice(start, end);
		    
		    
		    tiles.forEach((channel, index) => {
		        const tile = document.createElement('div');
		        tile.classList.add('tile');
		        tile.dataset.source = channel.src;
		        if (channel.key) tile.dataset.key = channel.key;
		        tile.innerHTML = `<img src="${channel.img}" alt="${channel.name}"><span>${channel.name}</span>`;
		        
		        tile.addEventListener('click', function () {
		            document.querySelectorAll('.tile').forEach(t => t.classList.remove('active'));
		            tile.classList.add('active');
		            loadStream(channel.src, channel.key || null);
		      });
		      
		      selector.appendChild(tile);
		      });
		}
		
		document.getElementById('prev-page').addEventListener('click', () => {
		    if (currentPage > 0) {
		        currentPage--;
		        renderChannels();
		    }
		});
		
		document.getElementById('next-page').addEventListener('click', () => {
		    if (currentPage < Math.ceil(channelData.length / pageSize) - 1) {
		        currentPage++;
		        renderChannels();
		    }
		});
		
		renderChannels();
        });
        
        document.addEventListener('contextmenu', e => e.preventDefault());

        function ctrlShiftKey(e, keyCode) {
            return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
        }

        document.onkeydown = (e) => {
            if (
                e.keyCode === 123 ||
                ctrlShiftKey(e, 'I') ||
                ctrlShiftKey(e, 'J') ||
                ctrlShiftKey(e, 'C') ||
                (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
            )
                return false;
        };
