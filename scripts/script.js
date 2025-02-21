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
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/tv5_hd.mpd",
                img: "https://i.imgur.com/jsCBRq0.png",
                name: "TV 5",
                key: "2615129ef2c846a9bbd43a641c7303ef:07c7f996b1734ea288641a68e1cfdc4d"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/cg_onesports_hd.mpd",
                img: "https://i.imgur.com/btiNwYt.png",
                name: "ONE SPORTS",
                key: "53c3bf2eba574f639aa21f2d4409ff11:3de28411cf08a64ea935b9578f6d0edd"
            },
	    {
                src: "https://gma7.jamesbenavides617.workers.dev/master.m3u8",
                img: "https://th.bing.com/th/id/OIP.aWHBusnumCQ8MKT_r2jXFAHaFj?rs=1&pid=ImgDetMain",
                name: "GMA"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/cnn_rptv_prod_hd.mpd",
                img: "https://i.imgur.com/IDCHfXm.png",
                name: "RPTV",
                key: "1917f4caf2364e6d9b1507326a85ead6:a1340a251a5aa63a9b0ea5d9d7f67595"		    
            }, 
	    {
                src: "https://qp-pldt-live-grp-06-prod.akamaized.net/out/u/cg_sari_sari_sd.mpd",
                img: "https://i.imgur.com/kKuO7LD.png",
                name: "SARI-SARI",
                key: "0a7ab3612f434335aa6e895016d8cd2d:b21654621230ae21714a5cab52daeb9d"
            },
            {
                src: "https://qp-pldt-live-grp-14-prod.akamaized.net/out/u/cg_buko_sd.mpd",
                img: "https://i.imgur.com/Du6LQCi.png",
                name: "BUKO CH",
                key: "d273c085f2ab4a248e7bfc375229007d:7932354c3a84f7fc1b80efa6bcea0615"
            },
            {
                src: "https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/onenews_hd1.mpd",
                img: "https://i.imgur.com/bmP06bk.png",
                name: "ONE NEWS",
                key: "d39eb201ae494a0b98583df4d110e8dd:6797066880d344422abd3f5eda41f45f"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/oneph_sd.mpd",
                img: "https://i.imgur.com/9dMuFE1.png",
                name: "ONE PH",
                key: "92834ab4a7e1499b90886c5d49220e46:a7108d9a6cfcc1b7939eb111daf09ab3"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/truefm_tv.mpd",
                img: "https://i.imgur.com/U8L0Liq.png",
                name: "TRUE FM TV",
                key: "0559c95496d44fadb94105b9176c3579:40d8bb2a46ffd03540e0c6210ece57ce"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/cg_mptv.mpd",
                img: "https://i.imgur.com/BMCnoRn.png",
                name: "MEDIA PILIPINAS TV",
                key: "6aab8f40536f4ea98e7c97b8f3aa7d4e:139aa5a55ade471faaddacc4f4de8807"
            },
            {
                src: "https://qp-pldt-live-grp-14-prod.akamaized.net/out/u/cg_ptv4_sd.mpd",
                img: "https://i.imgur.com/ycPz1Uc.png",
                name: "PEOPLE'S TELEVISION",
                key: "71a130a851b9484bb47141c8966fb4a3:ad1f003b4f0b31b75ea4593844435600"
            },
            {
                src: "https://qp-pldt-live-grp-07-prod.akamaized.net/out/u/ibc13_sd.mpd",
                img: "https://i.imgur.com/PwFOHQb.png",
                name: "IBC 13",
                key: "04e292bc99bd4ccba89e778651914254:ff0a62bdf8920ce453fe680330b563a5"
            },
            {
                src: "https://qp-pldt-live-grp-12-prod.akamaized.net/out/u/bilyonaryoch.mpd",
                img: "https://i.imgur.com/Z5ZyJ8c.png",
                name: "BILYONARYO CHANNEL",
                key: "227ffaf09bec4a889e0e0988704d52a2:b2d0dce5c486891997c1c92ddaca2cd2"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/cg_a2z.mpd",
                img: "https://i.imgur.com/DVSTY3w.png",
                name: "A2Z",
                key: "f703e4c8ec9041eeb5028ab4248fa094:c22f2162e176eee6273a5d0b68d19530"
            },
            {
                src: "https://cdn-ue1-prod.tsv2.amagi.tv/linear/amg01006-abs-cbn-kapcha-dash-abscbnono/index.mpd",
                img: "https://i.imgur.com/GEUL42b.png",
                name: "KAPAMILYA CHANNEL",
                key: "bd17afb5dc9648a39be79ee3634dd4b8:3ecf305d54a7729299b93a3d69c02ea5"
            },
            {
                src: "https://d3cjss68xc4sia.cloudfront.net/out/v1/89ea8db23cb24a91bfa5d0795f8d759e/index.mpd",
                img: "https://i.imgur.com/XzVYXaV.png",
                name: "ANC",
                key: "4bbdc78024a54662854b412d01fafa16:6039ec9b213aca913821677a28bd78ae"
            },
            {
                src: "https://d14c00opfjb50c.cloudfront.net/out/v1/0fa4eb67579d41cca4ed146c93aa855f/index.mpd",
                img: "https://i.imgur.com/Q81UWCk.png",
                name: "TELERADYO",
                key: "47c093e0c9fd4f80839a0337da3dd876:50547394045b3d047dc7d92f57b5fb33"
            },
            {
                src: "https://qp-pldt-live-grp-13-prod.akamaized.net/out/u/dr_knowledgechannel.mpd",
                img: "https://i.imgur.com/UIqEr2y.png",
                name: "KNOWLEDGE CH",
                key: "0f856fa0412b11edb8780242ac120002:783374273ef97ad3bc992c1d63e091e7"
            },
            {
                src: "https://amg01006-abs-cbn-abscbn-gma-x7-dash-abscbnono-dzsx9.amagi.tv/index.mpd",
                img: "https://i.imgur.com/IA7tK2B.png",
                name: "GMA PINOY TV",
                key: "c95ed4c44b0b4f7fa1c6ebbbbaab21a1:47635b8e885e19f2ccbdff078c207058"
            },
            {
                src: "https://jungotvstream.chanall.tv/jungotv/jungopinoytv/stream.m3u8",
                img: "https://i.imgur.com/FjAjdL0.png",
                name: "JUNGO PINOY TV"
            },
            {
                src: "https://qp-pldt-live-grp-06-prod.akamaized.net/out/u/cg_tapactionflix_hd1.mpd",
                img: "https://tapdmv.ovationproductionsmanila.com/logo-TapActionFlix-2021-B.png",
                name: "TAP ACTION FLIX",
		key: "bee1066160c0424696d9bf99ca0645e3:f5b72bf3b89b9848de5616f37de040b7"
            },
            {
                src: "https://jungotvstream.chanall.tv/jungotv/hallypop/stream.m3u8",
                img: "https://i.imgur.com/gYYYebi.png",
                name: "HALLYPOP"
            },
            {
                src: "https://d24xfhmhdb6r0q.cloudfront.net/out/v1/e897a7b6414a46019818ee9f2c081c4f/index.mpd",
                img: "https://i.imgur.com/CIPTNnT.png",
                name: "MYX",
                key: "f40a52a3ac9b4702bdd5b735d910fd2f:5ce1bc7f06b494c276252b4d13c90e51"
            },
            {
                src: "https://qp-pldt-live-grp-09-prod.akamaized.net/out/u/tvup_prd.mpd",
                img: "https://i.imgur.com/HhxOIJq.png",
                name: "TVUP",
                key: "83e813ccd4ca4837afd611037af02f63:a97c515dbcb5dcbc432bbd09d15afd41"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/cg_uaap_cplay_sd.mpd",
                img: "https://i.imgur.com/rifinVV.png",
                name: "UAAP VARSITY",
                key: "95588338ee37423e99358a6d431324b9:6e0f50a12f36599a55073868f814e81e"
            },
            {
                src: "https://qp-pldt-live-grp-14-prod.akamaized.net/out/u/cg_dreamworktag.mpd",
                img: "https://i.imgur.com/fh1Lg7b.png",
                name: "DREAMWORKS (TAG)",
                key: "564b3b1c781043c19242c66e348699c5:d3ad27d7fe1f14fb1a2cd5688549fbab"
            },
            {
                src: "https://qp-pldt-live-grp-12-prod.akamaized.net/out/u/pbo_sd.mpd",
                img: "https://i.imgur.com/709Uy7N.png",
                name: "PINOY BOX OFFICE",
                key: "dcbdaaa6662d4188bdf97f9f0ca5e830:31e752b441bd2972f2b98a4b1bc1c7a1"
            },
            {
                src: "https://qp-pldt-live-grp-12-prod.akamaized.net/out/u/viva_sd.mpd",
                img: "https://i.imgur.com/8y3fc3F.png",
                name: "VIVACINEMA",
                key: "07aa813bf2c147748046edd930f7736e:3bd6688b8b44e96201e753224adfc8fb"
            },
            {
                src: "https://qp-pldt-live-grp-07-prod.akamaized.net/out/u/cg_tagalogmovie.mpd",
                img: "https://i.imgur.com/ZbrvQpg.png",
                name: "TAGALIZED MOVIE CHANNEL",
                key: "96701d297d1241e492d41c397631d857:ca2931211c1a261f082a3a2c4fd9f91b"
            },
            {
                src: "https://qp-pldt-live-grp-09-prod.akamaized.net/out/u/cg_tvnmovie.mpd",
                img: "https://i.imgur.com/e9vo9Z8.png",
                name: "TVN MOVIES PINOY",
                key: "2e53f8d8a5e94bca8f9a1e16ce67df33:3471b2464b5c7b033a03bb8307d9fa35"
            },
            {
                src: "https://d9rpesrrg1bdi.cloudfront.net/out/v1/93b9db7b231d45f28f64f29b86dc6c65/index.mpd",
                img: "https://i.imgur.com/moSPpuJ.png",
                name: "CINEMA ONE",
                key: "58d0e56991194043b8fb82feb4db7276:d68f41b59649676788889e19fb10d22c"
            },
            {
                src: "https://d1bail49udbz1k.cloudfront.net/out/v1/3a895f368f4a467c9bca0962559efc19/index.mpd",
                img: "https://i.imgur.com/2Jn7QHG.png",
                name: "CINEMO",
                key: "aa8aebe35ccc4541b7ce6292efcb1bfb:aab1df109d22fc5d7e3ec121ddf24e5f"
            },
            {
                src: "https://qp-pldt-live-grp-13-prod.akamaized.net/out/u/bloomberg_sd.mpd",
                img: "https://i.imgur.com/pl4w2NN.png",
                name: "BLOOMBERG",
                key: "ef7d9dcfb99b406cb79fb9f675cba426:b24094f6ca136af25600e44df5987af4"
            },
            {
                src: "https://d1cy85syyhvqz5.cloudfront.net/v1/master/7b67fbda7ab859400a821e9aa0deda20ab7ca3d2/aljazeeraLive/AJE/index.m3u8",
                img: "https://1000logos.net/wp-content/uploads/2023/01/Al-Jazeera-Logo.png",
                name: "AL JAZEERA"
            },
            {
                src: "https://1a-1791.com/live/hr6yv36f/slot-4/mxtm-wdfe_360p/chunklist_DVR.m3u8",
                img: "https://i.imgur.com/SE4ZoBV.png",
                name: "RUSSIA TODAY"
            },
            {
                src: "https://qp-pldt-live-grp-12-prod.akamaized.net/out/u/dr_cnnhd.mpd",
                img: "https://i.imgur.com/UYpxXca.png",
                name: "CNN",
                key: "900c43f0e02742dd854148b7a75abbec:da315cca7f2902b4de23199718ed7e90"
            },
            {
                src: "https://cdn09jtedge.indihometv.com/joss/134/cnbcasia/index.m3u8",
                img: "",
                name: "CNBC"
            },
            {
                src: "https://1a-1791.com/live/hr6yv36f/slot-4/mxtm-wdfe_360p/chunklist_DVR.m3u8",
                img: "https://i.imgur.com/8p0dh0V.png",
                name: "SKY NEWS"
            },
            {
                src: "https://d2vnbkvjbims7j.cloudfront.net/containerA/LTN/playlist.m3u8",
                img: "https://i.imgur.com/ASuVFay.png",
                name: "BBC NEWS"
            },
            {
                src: "https://cdn09jtedge.indihometv.com/joss/134/euronews/index.m3u8",
                img: "",
                name: "EURONEWS"
            },
            {
                src: "https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8",
                img: "https://i.imgur.com/UtR5MHV.png",
                name: "DEUTSCHE WELLE"
            },
            {
                src: "https://qp-pldt-live-grp-13-prod.akamaized.net/out/u/dr_channelnewsasia.mpd",
                img: "https://i.imgur.com/NWP3n1k.png",
                name: "CNA",
                key: "b259df9987364dd3b778aa5d42cb9acd:753e3dba96ab467e468269e7e33fb813"
            },
            {
                src: "https://fox-foxnewsnow-vizio.amagi.tv/playlist.m3u8",
                img: "https://i.imgur.com/gDo64KN.png",
                name: "FOX NEWS LIVENOW"
            },
            {
                src: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index.m3u8",
                img: "https://static.epg.best/in/WION.in.png",
                name: "WION"
            },
            {
                src: "https://amg00405-rakutentv-cgtn-rakuten-i9tar.amagi.tv/master.m3u8",
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/CGTN.svg/512px-CGTN.svg.png",
                name: "CGTN"
            },
            {
                src: "https://live.france24.com/hls/live/2037218/F24_EN_HI_HLS/master_5000.m3u8",
                img: "https://static.epg.best/fr/France24English.fr.png",
                name: "FRANCE 24"
            },
            {
                src: "https://qp-pldt-live-grp-06-prod.akamaized.net/out/u/kix_hd1.mpd",
                img: "https://i.imgur.com/XDQMCio.png",
                name: "KIX",
                key: "a8d5712967cd495ca80fdc425bc61d6b:f248c29525ed4c40cc39baeee9634735"
            },
            {
                src: "https://qp-pldt-live-grp-06-prod.akamaized.net/out/u/cg_thrill_sd.mpd",
                img: "https://i.imgur.com/LCX2guc.png",
                name: "THRILL",
                key: "928114ffb2394d14b5585258f70ed183:a82edc340bc73447bac16cdfed0a4c62"
            },
            {
                src: "https://qp-pldt-live-grp-12-prod.akamaized.net/out/u/cg_hbohd.mpd",
                img: "https://i.imgur.com/fHBIgs6.png",
                name: "HBO",
                key: "d47ebabf7a21430b83a8c4b82d9ef6b1:54c213b2b5f885f1e0290ee4131d425b"
            },
            {
                src: "https://qp-pldt-live-grp-12-prod.akamaized.net/out/u/cg_cinemax.mpd",
                img: "https://i.imgur.com/YomkvVa.png",
                name: "CINEMAX",
                key: "b207c44332844523a3a3b0469e5652d7:fe71aea346db08f8c6fbf0592209f955"
            },
            {
                src: "https://qp-pldt-live-grp-12-prod.akamaized.net/out/u/cg_hbohits.mpd",
                img: "https://i.imgur.com/pZn9JHj.png",
                name: "HBO HITS",
                key: "b04ae8017b5b4601a5a0c9060f6d5b7d:a8795f3bdb8a4778b7e888ee484cc7a1"
            },
            {
                src: "https://qp-pldt-live-grp-12-prod.akamaized.net/out/u/cg_hbosign.mpd",
                img: "https://i.imgur.com/3BOoqQn.png",
                name: "HBO SIGNATURE",
                key: "a06ca6c275744151895762e0346380f5:559da1b63eec77b5a942018f14d3f56f"
            },
            {
                src: "https://qp-pldt-live-grp-12-prod.akamaized.net/out/u/cg_hbofam.mpd",
                img: "https://i.imgur.com/Zy3pvJV.png",
                name: "HBO FAMILY",
                key: "872910c843294319800d85f9a0940607:f79fd895b79c590708cf5e8b5c6263be"
            },
            {
                src: "https://streaming.indihometv.com/atm/hlsv3/rock_entertainment/playlist.m3u8",
                img: "",
                name: "ROCK ENTERTAINMENT"
            },
            {
                src: "https://streaming.indihometv.com/atm/hlsv3/ROCK_ACTION/playlist.m3u8",
                img: "",
                name: "ROCK ACITON"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/cg_axn_sd.mpd",
                img: "https://upload.wikimedia.org/wikipedia/commons/d/d0/AXN_Logo_2015.png",
                name: "AXN",
		key: "fd5d928f5d974ca4983f6e9295dfe410:3aaa001ddc142fedbb9d5557be43792f"
		    
            },
            {
                src: "https://ott.zapitv.com/live/eds_c2/axn_white/dash_live_enc/axn_white.mpd",
                img: "",
                name: "AXN MOVIES",
                key: "f9e4be09926c262effa2b5381ae3553d:d630e04e0c5e3f98dc38840be1c1dd4c"
            },
            {
                src: "https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/dr_warnertvhd.mpd",
                img: "https://i.imgur.com/Hy26eiy.png",
                name: "WARNER TV",
                key: "4503cf86bca3494ab95a77ed913619a0:afc9c8f627fb3fb255dee8e3b0fe1d71"
            },
            {
                src: "https://ott.zapitv.com/live/eds_c2/calle_13/dash_live_enc/calle_13.mpd",
                img: "",
                name: "CALLE 13",
                key: "6ae50bb56203f2f3875e3ee78efab1a5:f22429107ea7806f54902bb2926c8872"
            },
            {
                src: "https://ott.zapitv.com/live/eds_c2/syfy/dash_live_enc/syfy.mpd",
                img: "",
                name: "SYFY",
                key: "95ec1e26e80c38258a30101d06c8cbf7:0d0df5189256c0bf32c0cd0976bac5bd"
            },
            {
                src: "https://streaming.indihometv.com/joss/130/studiouniversal/playlist.m3u8",
                img: "",
                name: "STUDIO UNIVERSAL"
            },
            {
                src: "https://fsly.stream.peacocktv.com/Content/CMAF_OL1-CTR-4s/Live/channel(usa-east)/master.mpd",
                img: "https://i.imgur.com/8zxXx5v.png",
                name: "USA NETWORK",
                key: "78ab64fa90f137a697743b5dc27b2f96:de4d31c7fc6005ede28abab2a0720a9f"
            },
            {
                src: "https://qp-pldt-live-grp-04-prod.akamaized.net/out/u/hits_hd1.mpd",
                img: "https://i.imgur.com/YeqyD9W.png",
                name: "HITS",
                key: "dac605bc197e442c93f4f08595a95100:975e27ffc1b7949721ee3ccb4b7fd3e5"
            },
            {
                src: "https://streaming.indihometv.com/joss/133/hitsmovie/playlist.m3u8",
                img: "https://i.imgur.com/1rG3el2.png",
                name: "HITS MOVIES"
            },
            {
                src: "https://qp-pldt-live-grp-09-prod.akamaized.net/out/u/cg_hitsnow.mpd",
                img: "https://i.imgur.com/S3pNx8Gl.png",
                name: "HITS NOW",
		key: "14439a1b7afc4527bb0ebc51cf11cbc1:92b0287c7042f271b266cc11ab7541f1"
            },
            {
                src: "https://ott.zapitv.com/live/eds_c2/comedy_central/dash_live_enc/comedy_central.mpd",
                img: "https://i.imgur.com/32XV9vn.png",
                name: "COMEDY CENTRAL",
                key: "f8757de5a495ce5db4893c2eefc11e58:d8309cd9fa8c286f277b4cb9841d7bd2"
            },
            {
                src: "https://fl2.moveonjoy.com/PARAMOUNT_NETWORK/index.m3u8",
                img: "https://i.imgur.com/fxwLZXp.png",
                name: "PARAMOUNT NETWORK"
            },
            {
                src: "https://ott.zapitv.com/live/eds_c2/amc_hd/dash_live_enc/amc_hd.mpd",
                img: "https://i.imgur.com/PQGEkPM.png",
                name: "AMC",
                key: "ffec3dec40cb61a45e969c84977615ef:c6fbbe1e506a4323d3046b30731c9d52"
            },
            {
                src: "https://ott.zapitv.com/live/eds_c2/sundance_hd/dash_live_enc/sundance_hd.mpd",
                img: "https://i.imgur.com/dfTesaD.png",
                name: "SUNDANCE TV",
                key: "7107df0ecf168438df3d5e35a06f5e8b:1541c20a7dc82b302ec9b97274910162"
            },
            {
                src: "https://ott.zapitv.com/live/eds_c2/DARK_HD/dash_live_enc/DARK_HD.mpd",
                img: "https://i.imgur.com/bdLVFSx.png",
                name: "DARK",
                key: "ee3899fcba09e6de20355394106ca745:d84b6489ff8e5aeecde84a659c0617b8"
            },
            {
                src: "https://ott.zapitv.com/live/eds_c2/xtrm_hd/dash_live_enc/xtrm_hd.mpd",
                img: "https://tvprofil.com/img/kanali-logo/XTRM_ES_logo_v2.png",
                name: "XTRM",
                key: "563e6e1367e0c8c0f6643cf0ae92c4e7:7a84ece91b690c5b717eeffd58a55b04"
            },
            {
                src: "https://ott.zapitv.com/live/eds_c2/hollywood_hd/dash_live_enc/hollywood_hd.mpd",
                img: "https://i.imgur.com/q7xVRtE.png",
                name: "HOLLYWOOD",
                key: "38b0a87ba1614db52f1520191282a0db:af101261419cdcf7c09b82592eac862a"
            },
            {
                src: "https://uselector.cdn.intigral-ott.net/TCM/TCM.isml/manifest.mpd",
                img: "https://i.imgur.com/KuQMnuf.png",
                name: "TURNER CLASSIC MOVIES",
                key: "59c626d2eae3ad531022136f1bb4769e:5c83465dc798bab650d802725cc26270"
            },
            {
                src: "https://uselector.cdn.intigral-ott.net/MBAH/MBAH.isml/manifest.mpd",
                img: "https://i.imgur.com/Ju4pzmh.png",
                name: "MBC ACTION",
                key: "5567531458e9c2e93d22935c45fdef52:f2f613fb2132acd019d2a96bf1be15c1"
            },
            {
                src: "https://uselector.cdn.intigral-ott.net/MBMH/MBMH.isml/manifest.mpd",
                img: "https://i.imgur.com/fNASKSl.png",
                name: "MBC MAX",
                key: "0a414b719bade2acc124e22c042290f3:db84a5afa10a001dd73b094c14638212"
            },
            {
                src: "https://streaming.indihometv.com/joss/134/cinemaworld/playlist.m3u8",
                img: "https://i.imgur.com/GoC9AZ2.png",
                name: "CINEMAWORLD"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/lotusmacau_prd.mpd",
                img: "https://i.imgur.com/SNc90AX.png",
                name: "LOTUS MACAU",
                key: "60dc692e64ea443a8fb5ac186c865a9b:01bdbe22d59b2a4504b53adc2f606cc1"
            },
            {
                src: "https://ott.zapitv.com/live/eds_c2/mtv_espana/dash_live_enc/mtv_espana.mpd",
                img: "https://i.imgur.com/tb65CMh.png",
                name: "MTV",
                key: "10f86eedfa603133e035c4c64226dd6b:1678761258b8a16d5d5b9241bd647536"
            },
            {
                src: "https://tr.live.cdn.cgates.lt/live/dash/560701/index.mpd",
                img: "https://i.imgur.com/6pAXZUA.png",
                name: "MTV LIVE",
                key: "1041d72f861c4e60a87a4e828250ded6:c75b1640bc83ec0c653902a775e5bb1a"
            },
            {
                src: "https://ott.zapitv.com/live/eds_c2/mtv_hits/dash_live_enc/mtv_hits.mpd",
                img: "https://i.imgur.com/z0uTcNt.png",
                name: "MTV HITS",
                key: "f2975a79fd099430a195212b04b4dd1e:7f8f21c0b12be72690510d92b893b5ac"
            },
            {
                src: "https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg01076-lightningintern-traceurban-samsungnz/playlist.m3u8",
                img: "https://i.imgur.com/VRazo4V.png",
                name: "TRACE URBAN"
            },
            {
                src: "https://d35j504z0x2vu2.cloudfront.net/v1/manifest/0bc8e8376bd8417a1b6761138aa41c26c7309312/trace-uk/6655b878-f320-467c-b91d-153baf27a101/1.m3u8",
                img: "https://i.imgur.com/inKLYI5.png",
                name: "TRACE UK"
            },
            {
                src: "https://giatv.bozztv.com/giatv/giatv-kpoptvplay/kpoptvplay/chunks.m3u8",
                img: "https://i.imgur.com/Tf0vweF.png",
                name: "KPOP TV PLAY"
            },
            {
                src: "https://tglmp01.akamaized.net/out/v1/de55fad9216e4fe7ad8d2eed456ba1ec/manifest.mpd",
                img: "https://i.imgur.com/QxTehhs.png",
                name: "ANIMAX",
                key: "edf1a715de9748638dd2fad75a419af2:2f5a3199b26e9b693ae881af7ff864cf"
            },
            {
                src: "https://amc-anime-x-hidive-1-us.tablo.wurl.tv/playlist.m3u8",
                img: "https://i.imgur.com/E1LIeR2.png",
                name: "ANIME X HIDIVE"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/cg_tvnpre.mpd",
                img: "https://i.imgur.com/lY1BAUH.png",
                name: "TVN",
                key: "e1bde543e8a140b38d3f84ace746553e:b712c4ec307300043333a6899a402c10"
            },
            {
                src: "https://streaming.indihometv.com/joss/133/tvnmovies/playlist.m3u8",
                img: "https://i.imgur.com/oLzTyUX.png",
                name: "TVN MOVIES"
            },
            {
                src: "https://streaming.indihometv.com/joss/133/sone/playlist.m3u8",
                img: "https://i.imgur.com/Xv8cQh0.png",
                name: "ONE"
            },
            {
                src: "https://kbsworld-ott.akamaized.net/hls/live/2002341/kbsworld/master.m3u8",
                img: "https://i.imgur.com/JAL3Ohz.png",
                name: "KBS WORLD"
            },
            {
                src: "https://nhkwlive-ojp.akamaized.net/hls/live/2003459/nhkwlive-ojp-en/index.m3u8",
                img: "https://i.imgur.com/WX0fL1C.png",
                name: "NHK WORLD"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/dr_abc_aus.mpd",
                img: "https://i.imgur.com/qQ33TVM.png",
                name: "ABC AUSTRALIA",
                key: "389497f9f8584a57b234e27e430e04b7:3b85594c7f88604adf004e45c03511c0"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/dr_cctv4.mpd",
                img: "https://i.imgur.com/h9vqWzN.png",
                name: "CCTV4",
                key: "b83566836c0d4216b7107bd7b8399366:32d50635bfd05fbf8189a0e3f6c8db09"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/dr_cgtn.mpd",
                img: "https://i.imgur.com/m20XaAQ.png",
                name: "CGTN DOCUMENTARY",
                key: "0f854ee4412b11edb8780242ac120002:9f2c82a74e727deadbda389e18798d55"
            },
            {
                src: "https://amdlive-ch01-ctnd-com.akamaized.net/arirang_1ch/smil:arirang_1ch.smil/playlist.m3u8",
                img: "https://i.imgur.com/jgiNWxJ.png",
                name: "ARIRANG"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/dr_tv5_monde.mpd",
                img: "https://i.imgur.com/W4o8wtt.png",
                name: "TV5 MONDE",
                key: "fba5a720b4a541b286552899ba86e38b:f63fa50423148bfcbaa58c91dfcffd0e"
            },
            {
                src: "https://streaming.indihometv.com/joss/133/disco/playlist.m3u8",
                img: "https://i.imgur.com/o703o4e.png",
                name: "DISCOVERY"
            },
            {
                src: "https://streaming.indihometv.com/joss/194/animalplanet/playlist.m3u8",
                img: "https://i.imgur.com/RXMzzlB.png",
                name: "ANIMAL PLANET"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/cg_foodnetwork_hd1.mpd",
                img: "https://i.imgur.com/DvXfCrO.png",
                name: "FOOD NETWORK",
                key: "b7299ea0af8945479cd2f287ee7d530e:b8ae7679cf18e7261303313b18ba7a14"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/hgtv_hd1.mpd",
                img: "https://i.imgur.com/FGgFyoi.png",
                name: "HGTV",
                key: "f0e3ab943318471abc8b47027f384f5a:13802a79b19cc3485d2257165a7ef62a"
            },
            {
                src: "https://streaming.indihometv.com/joss/133/tlc/playlist.m3u8",
                img: "https://i.imgur.com/bU6a84F.png",
                name: "TLC"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/travel_channel_sd.mpd",
                img: "https://i.imgur.com/LplHeem.png",
                name: "TRAVEL CHANNEL",
                key: "f3047fc13d454dacb6db4207ee79d3d3:bdbd38748f51fc26932e96c9a2020839"
            },
            {
                src: "https://uselector.cdn.intigral-ott.net/DCX/DCX.isml/manifest.mpd",
                img: "https://i.imgur.com/i9KwZND.png",
                name: "INVESTIGATION DISCOVERY",
                key: "2e364252e8341f5b172da9aa813947e7:674099ec66ddecbc55a244ce06228188"
            },
            {
                src: "https://cdn3.skygo.mn/live/disk1/Discovery_Asia/HLS-FTA/Discovery_Asia.m3u8",
                img: "https://i.imgur.com/kftMPcc.png",
                name: "DISCOVERY ASIA"
            },
            {
                src: "https://uselector.cdn.intigral-ott.net/DCF/DCF.isml/manifest.mpd",
                img: "https://i.imgur.com/IG2mw0o.png",
                name: "DISCOVERY FAMILY",
                key: "bce56c8de2f1b27b16dd7d3abc2409b6:8c1c393bb61be740910438f6e49c7c32a"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/asianfoodnetwork_sd.mpd",
                img: "https://i.imgur.com/O5jBcL2.png",
                name: "ASIAN FOOD NETWORK",
                key: "1619db30b9ed42019abb760a0a3b5e7f:5921e47fb290ae263291b851c0b4b6e4"
            },
            {
                src: "https://uselector.cdn.intigral-ott.net/NGO/NGO.isml/manifest.mpd",
                img: "https://i.imgur.com/2TeKCBK.png",
                name: "NATIONAL GEOGRAPHIC",
                key: "1ba94b93b39ab809b587237d7b60a049:e0f94dbfbf9e6e45c9567a7b50eb612c"
            },
            {
                src: "https://uselector.cdn.intigral-ott.net/NHD/NHD.isml/manifest.mpd",
                img: "https://i.imgur.com/ZfWiVTe.png",
                name: "NATIONAL GEOGRAPHIC WILD",
                key: "276e56bc14095f327bbf0c936eb7b38c:63127eaddb18c596db05657424849519"
            },
            {
                src: "https://streaming.indihometv.com/joss/133/crimeinvestigation/playlist.m3u8",
                img: "https://i.imgur.com/KeM5KlR.png",
                name: "CRIME + INVESTIGATION"
            },
            {
                src: "https://streaming.indihometv.com/joss/134/lifetime/playlist.m3u8",
                img: "https://i.imgur.com/LIrEjuN.png",
                name: "LIFETIME"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/dr_historyhd.mpd",
                img: "https://i.imgur.com/z9fsJ2L.png",
                name: "HISTORY",
                key: "a7724b7ca2604c33bb2e963a0319968a:6f97e3e2eb2bade626e0281ec01d3675"
            },
            {
                src: "https://streaming.indihometv.com/joss/133/techstorm/playlist.m3u8",
                img: "https://i.imgur.com/yt8UxLj.png",
                name: "TECHSTORM"
            },
            {
                src: "https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg00718-outdoorchannela-outdoortvnz-samsungnz/playlist.m3u8",
                img: "https://cms.cignal.tv/Upload/Images/Outdoor-Channel.png",
                name: "OUTDOOR CHANNEL"
            },
            {
                src: "https://streaming.indihometv.com/joss/194/curiosity/playlist.m3u8",
                img: "https://i.imgur.com/VqTXs9t.png",
                name: "CURIOSITY CHANNEL"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/cg_bbcearth_hd1.mpd",
                img: "https://i.imgur.com/GV3GAln.png",
                name: "BBC EARTH",
                key: "34ce95b60c424e169619816c5181aded:0e2a2117d705613542618f58bf26fc8e"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/cg_bbclifestyle.mpd",
                img: "https://i.imgur.com/ipKlaA4.png",
                name: "BBC LIFESTYLE",
                key: "34880f56627c11ee8c990242ac120002:c23677c829bb244b79a3dc09ffd88ca0"
            },
            {
                src: "https://ott.zapitv.com/live/eds_c2/blaze/dash_live_enc/blaze.mpd",
                img: "https://i.imgur.com/GmrUIHd.png",
                name: "AMC BREAK",
                key: "15e412a4edd85313233969913072e0ff:5098eafaff2b246ee15e8f9aeb5403fb"
            },
            {
                src: "https://ott.zapitv.com/live/eds_c2/crimen/dash_live_enc/crimen.mpd",
                img: "https://i.imgur.com/4j0xoNI.png",
                name: "AMC CRIME",
                key: "e3048d6cc539b8a8b90d74992fb4e197:4e494e4d179abc3d3f10073b21ac8630"
            },
            {
                src: "https://uselector.cdn.intigral-ott.net/DIS/DIS.isml/manifest.mpd",
                img: "https://i.imgur.com/gAMh5Ls.png",
                name: "DISNEY",
                key: "72800c62fcf2bfbedd9af27d79ed35d6:b6ccb9facb2c1c81ebe4dfaab8a45195"
            },
            {
                src: "https://uselector.cdn.intigral-ott.net/DJR/DJR.isml/manifest.mpd",
                img: "https://i.imgur.com/rLROXxu.png",
                name: "DISNEY JR.",
                key: "f5df57914a0922d5d5ed6b0a4af6290a:c62b10a180d1770a355b3c4cb6506ca0"
            },
            {
                src: "https://fl5.moveonjoy.com/DISNEY_XD/index.m3u8",
                img: "https://i.imgur.com/Bccu95o.png",
                name: "DISNEY XD"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/dr_cartoonnetworkhd.mpd",
                img: "https://i.imgur.com/Offhcm1.png",
                name: "CARTOON NETWORK",
                key: "a2d1f552ff9541558b3296b5a932136b:cdd48fa884dc0c3a3f85aeebca13d444"
            },
            {
                src: "https://cdn4.skygo.mn/live/disk1/Boomerang/HLS-FTA/Boomerang.m3u8",
                img: "https://i.imgur.com/kHhmOMp.png",
                name: "CARTOONITO"
            },
            {
                src: "https://ott.zapitv.com/live/eds_c2/boing/dash_live_enc/boing.mpd",
                img: "https://i.imgur.com/uRgdZ6m.png",
                name: "BOING",
                key: "97c3e5f52bf51efe706c221930bc2b5b:b9473af4e52eaa9c9def9f8a5c54333c"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/cg_dreamworks_hd1.mpd",
                img: "https://i.imgur.com/Iy35n22.png",
                name: "DREAMWORKS",
                key: "4ab9645a2a0a47edbd65e8479c2b9669:8cb209f1828431ce9b50b593d1f44079"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/dr_nickelodeon.mpd",
                img: "https://i.imgur.com/kbIi1V6.png",
                name: "NICKELODEON",
                key: "9ce58f37576b416381b6514a809bfd8b:f0fbb758cdeeaddfa3eae538856b4d72"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/dr_nickjr.mpd",
                img: "https://i.imgur.com/eaUHjP6.png",
                name: "NICK JR.",
                key: "bab5c11178b646749fbae87962bf5113:0ac679aad3b9d619ac39ad634ec76bc8"
            },
            {
                src: "https://tr.live.cdn.cgates.lt/live/dash/561208/index.mpd",
                img: "https://i.imgur.com/XhTY6wi.png",
                name: "NICKTOONS",
                key: "3161c6c45076419fbbc333c277a22f65:18827aad7e2e79e526f529fd5027cb47"
            },
            {
                src: "https://amg01553-blueantmediaasi-zoomoonz-samsungnz-rdufn.amagi.tv/playlist/amg01553-blueantmediaasi-zoomoonz-samsungnz/playlist.m3u8",
                img: "https://i.imgur.com/daHHNzj.png",
                name: "ZOOMOO"
            },
            {
                src: "https://2-fss-2.streamhoster.com/pl_140/amlst:200914-1298290/chunklist_b2000000.m3u8",
                img: "https://i.imgur.com/xhmWQXs.png",
                name: "PBS KIDS"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/cg_moonbug_kids_sd.mpd",
                img: "https://i.imgur.com/v4ZYiUL.png",
                name: "MOONBUG",
                key: "0bf00921bec94a65a124fba1ef52b1cd:0f1488487cbe05e2badc3db53ae0f29f"
            },
            {
                src: "https://streaming.indihometv.com/joss/134/indikids/playlist.m3u8",
                img: "https://i.imgur.com/nMwW8Ii.png",
                name: "FUN PLANET"
            },
            {
                src: "https://streaming.indihometv.com/joss/130/horee/playlist.m3u8",
                img: "https://i.imgur.com/81fqX1m.png",
                name: "HOREE!"
            },
            {
                src: "https://dmr1h4skdal9h.cloudfront.net/v1/manifest/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-msbj6srh7nhug/ce36558b-b031-4284-94be-91ed22d31a41/2.m3u8",
                img: "https://i.imgur.com/BbdlqWg.png",
                name: "BBC KIDS"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/cg_pbarush_hd1.mpd",
                img: "https://i.imgur.com/J4QCDLG.png",
                name: "PBA RUSH",
                key: "76dc29dd87a244aeab9e8b7c5da1e5f3:95b2f2ffd4e14073620506213b62ac82"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/cg_onesportsplus_hd1.mpd",
                img: "https://i.imgur.com/nFLt8cN.png",
                name: "ONE SPORTS PLUS",
                key: "322d06e9326f4753a7ec0908030c13d8:1e3e0ca32d421fbfec86feced0efefda"
            },
            {
                src: "https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/pl_nba.mpd",
                img: "https://i.imgur.com/zmAm1HJ.png",
                name: "NBA TV PHILIPPINES",
                key: "f36eed9e95f140fabbc88a08abbeafff:0125600d0eb13359c28bdab4a2ebe75a"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/dr_tapsports.mpd",
                img: "https://i.imgur.com/aeRpXyj.png",
                name: "TAP SPORTS",
                key: "eabd2d95c89e42f2b0b0b40ce4179ea0:0e7e35a07e2c12822316c0dc4873903f"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/cg_premiersports_hd1.mpd",
                img: "https://i.imgur.com/QWunFo1.png",
                name: "PREMIER SPORTS",
                key: "fc19c98cb9504a0fb78b22fea0a4b814:ea683112a96d4ae6c32d4ea13923e8c7"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/dr_premiertennishd.mpd",
                img: "https://i.imgur.com/CGEYT3y.png",
                name: "PREMIER SPORTS 2",
                key: "59454adb530b4e0784eae62735f9d850:61100d0b8c4dd13e4eb8b4851ba192cc"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/dr_spotvhd.mpd",
                img: "https://i.imgur.com/E9WTTwg.png",
                name: "SPOTV",
                key: "ec7ee27d83764e4b845c48cca31c8eef:9c0e4191203fccb0fde34ee29999129e"
            },
            {
                src: "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/dr_spotv2hd.mpd",
                img: "https://i.imgur.com/ymGJTxi.png",
                name: "SPOTV2",
                key: "7eea72d6075245a99ee3255603d58853:6848ef60575579bf4d415db1032153ed"
            },
            {
                src: "https://ott.zapitv.com/live/eds_c2/eurosport_1_hd/dash_live_enc/eurosport_1_hd.mpd",
                img: "https://i.imgur.com/8KCZ2Gy.png",
                name: "EUROSPORT 1",
                key: "237be8ca9383755e9f5784dd23f545eb:15a723773c3b3cbce295c0aed0bc71c3"
            },
            {
                src: "https://ott.zapitv.com/live/eds_c2/eurosport_2_hd/dash_live_enc/eurosport_2_hd.mpd",
                img: "https://i.imgur.com/Mja3gfp.png",
                name: "EUROSPORT 2",
                key: "15382879a9bcfa6f1a04a86d5b4324e9:664241133368ab039dc1fb15206ba54b"
            },
            {
                src: "https://unifi-live07.secureswiftcontent.com/UnifiHD/live11.mpd",
                img: "https://i.imgur.com/lCZSIul.png",
                name: "UNIFI SPORTS"
            },
            {
                src: "https://tr.live.cdn.cgates.lt/live/dash/561203/index.mpd",
                img: "https://i.imgur.com/5ZYUPx3.png",
                name: "FAST AND FUN BOX",
                key: "b6bd9264f24444c9a1bea842ba0bc33d:00c737b67ab210796510463a99b0b00d"
            },
            {
                src: "https://streaming.indihometv.com/joss/133/paramount/playlist.m3u8",
                img: "https://i.imgur.com/LUm5esA.png",
                name: "FIGHT SPORTS"
            },
            {
                src: "https://cdnlb.tvplayhome.lt/live/eds/TV3_Sport_HD_HVC/GO3_LIVE_DASH_AVC/TV3_Sport_HD_HVC.mpd",
                img: "https://i.imgur.com/8HRxNzz.png",
                name: "GO3 SPORTS 1",
                key: "610ad79e26a84fc782c987455e21a86b:d2d4acc6e79447b55f3f5c0267af06f5"
            },
            {
                src: "https://cdnlb.tvplayhome.lt/live/eds/TV3_Sport2_HD_HVC/GO3_LIVE_DASH_AVC/TV3_Sport2_HD_HVC.mpd",
                img: "https://i.imgur.com/vAOAyhj.png",
                name: "GO3 SPORTS 2",
                key: "3fc5ce88ae24460bafa447b53ab5f548:476a55ef72c5e27e310668b1667da615"
            },
            {
                src: "https://cdnlb.tvplayhome.lt/live/eds/TV3_Sport3_HD_HVC/GO3_LIVE_DASH_AVC/TV3_Sport3_HD_HVC.mpd",
                img: "https://i.imgur.com/OdyD85P.png",
                name: "GO3 SPORTS 3",
                key: "a2a75672057f462089c2849b8184fcb0:94899cace4911c617c27d8f878de2b43"
            },
            {
                src: "https://tr.live.cdn.cgates.lt/live/dash/561002/index.mpd",
                img: "https://i.imgur.com/mhKLXFA.png",
                name: "SETANTA SPORTS 1",
                key: "8ab2332442854e62b0018eec3ee58484:37fdee8b6eef5c96001e8c6fc47bfc08"
            },
            {
                src: "https://tr.live.cdn.cgates.lt/live/dash/561504/index.mpd",
                img: "https://i.imgur.com/7rPQkcz.png",
                name: "SETANTA SPORTS 2",
                key: "9552bcbabfbd4ac19744422143bfb875:e6daacaced7eba147d2b667441060a4f"
            },
            {
                src: "https://tracetv-sportstarts-vidaa.amagi.tv/playlist.m3u8",
                img: "https://i.imgur.com/rR5SYHY.png",
                name: "TRACE SPORT STARS"
            },
            {
                src: "https://cdn09jtedge.indihometv.com/joss/133/nba/index.m3u8",
                img: "https://i.imgur.com/CIBoLmB.png",
                name: "W-SPORT"
            },
            {
                src: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_1660.m3u8?xtreamiptv.m3u8",
                img: "https://logos-download.com/wp-content/uploads/2016/09/Red_Bull_TV_logo.png",
                name: "RED BULL TV"
            },
            {
                src: "https://eyeonesports.com/ES2RA-628g.m3u8",
                img: "https://i.imgur.com/P8e2lWb.png",
                name: "ESR"
            },
            {
                src: "https://9769bd6405b245ea9adca1889a0b491b.mediatailor.us-east-1.amazonaws.com/v1/master/f4e8c53a8367a5b58e20ce054ea3ce25a3e904d3/Samsung-in_BilliardTV/playlist.m3u8",
                img: "https://i.imgur.com/dMs73EE.png",
                name: "BILLARDS TV"
            },
            {
                src: "https://1180885077.rsc.cdn77.org/HLS/BOXINGTV.m3u8",
                img: "https://i.imgur.com/tqNWVlo.png",
                name: "BOXING TV"
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
