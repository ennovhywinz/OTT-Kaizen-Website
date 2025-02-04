        if (localStorage.getItem('loggedIn') !== 'true') {
            window.location.href = 'index.html';
        }

        function logout() {
		sessionStorage.clear();
		localStorage.clear();
		window.location.replace('index.html');
        }
        
        if (window.history && window.history.pushState) {
		window.history.pushState('newState', null, window.location.href);
		window.onpopstate = function() {
		window.history.pushState('newState', null, window.location.href);
		};
	}

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
        pipButton.innerHTML = '<img src="https://i.imgur.com/sbtYsFs.png">';
        pipButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 8px 12px;
            background: rgba(217, 217, 120, 0.7);
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
        
        function handleFullScreenChange() {
            if (document.fullscreenElement) {
                pipButton.style.display = 'none';
            } else {
                pipButton.style.display = 'block';
            }
        }
        
        document.addEventListener('fullscreenchange', handleFullScreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
        document.addEventListener('mozfullscreenchange', handleFullScreenChange);
        document.addEventListener('MSFullscreenChange', handleFullScreenChange);
        
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
			name: "TEST [IVE - ATTITUDE]",
			src: "https://media-hosting.imagekit.io//f4228b970ce5490a/IVE%20%EC%95%84%EC%9D%B4%EB%B8%8C%20'ATTITUDE'%20MV.mp4?Expires=1833192173&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ozXKB8L4GUArO6oLc-x7mHQR2DMxKHdY1iIkgYjKjWwz~BQ0HWtXVv7jlXZ53KC~u2Uordhy6GK6Ee9m0tXk0HI7be75xlIMXKJtCTaZKRvrwkq8dlgpgnqeRz2RUXt2oN8S7lx6yZYO7-4qM8LElcHTA5qdXMIyCPkjGckS2hG5iY6g2BoyKQMDU32iJ6RJPoKrppGKoX~rllyNsmClZBS7YkA3RDpQ09ioGvw4i3o0xBVOouzKBUzlx4HRWQCc3v0WRKMNb9EyTeyfc-ebC09IaYlf3aFGCw7rzbt0xaTfOe91tBlyyGCwO0tEi9jSNHgTC08EFbdRcOpuzMlCJQ__",
			key: "",
			drm: ""
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
