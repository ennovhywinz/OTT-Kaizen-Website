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
                src: "https://gma.fflame143.workers.dev//master.m3u8",
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
   
