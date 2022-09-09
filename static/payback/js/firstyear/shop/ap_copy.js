
(function() {
	'use strict';

})();
(function () {
	'use strict';

	// let vh = window.innerHeight * 0.01;
	// document.documentElement.style.setProperty('--vh', `${vh}px`);

	// const bodyScrollLock = require('body-scroll-lock');
	// const targetElement = document.querySelector('#main-wrapper');

	// bodyScrollLock.disableBodyScroll(targetElement);

	

	// function openFooter() {
	// 	$('.mobile-display-btn').click(function () {
	// 		clickMobileDisplayBtn(this);
	// 	});
	// }

	// document.querySelector('.mobile-display-btn').onclick = () => {
	// 	clickMobileDisplayBtn();
	// };

	// function clickMobileDisplayBtn() {
	// 	// $('.side-menu-wrapper').removeClass('contact');
	// 	// $('.app').removeClass('open-more');
	// 	// $('.mckinney-logo').removeClass('open-more');
	// 	// $('.sticky-slider').removeClass('open-more');
		
	// 	$('#footerWrapper').toggleClass('open-footer');
	// 	$('.mobile-display-btn').toggleClass('open-footer');
	// }

	var introAnimation, //timeline for intro animation
		downloadUrl,
		gettingDownloadUrl = false,
		newTab,
		selectedPathData, //api/SelectedPaths/getSelectedPathSections?id=' + currentCollegePath
		currentChallenge,
		currentChallengesData,
		currentChallengesDataIndex,
		currentSelectedPathIndex,
		currentChallengeIndex,
		colleges, //api/SelectedPaths/getSelectedPathsWithColleges?gpaId=$GPA&extraCurriculars=%5B$EXTRA%5D&stateId=$STATE
		currentSection,// store the corrent section here
		currentCollegePath, //getCollegeId();
		selectedCollege, //selected college array
		sectionChallengesMap = {},
		currentCollege,
		currentCollegeId, //get college id
		collegeCost, //get cost of college choosen
		sectionData, //section array
		currentSection, //getCollegeId();
		currentSectionIndex, //get current section index
		selectedOutcomeAddedChallengeFlag = false,
		selectedOutcome,
		priorCurrentSection,
		communityCollegeOnlyOption = 0,
		outcomeChallenges,
		outcomeChallengesMap = {},
		loadedSections = 0,
		allSectionsLoaded = false,
		globalDirection,
		sectionIdCounter = 0,
		frontButtonColors = ["#01b6ad", '#fff0d2', '#1e2633', '#9F2046', '#313d4c'],
		backButtonColors = ['#1e2633', '#01b6ad', '#9F2046', '#01b6ad', '#c6e2b6'],
		currentLanguage = '',
		initLoaded = false,
		//selectedPathCollegeType,
		firstChallenge, //first challenge of the different college options
		challengeData, //api/Sections/getSectionChallenges?id=' + currentSection, data.section.SectionChallenges;
		//currentChallenges,
		currentChallengesIndex, //get current challenge displaying
		//nextChallengeIndex,
		//outcomeIndex,
		sectionCount, //how many sections are in the path
		meterFocus = 500, //placeholder for focus meter start
		meterHappiness = 500, //placeholder for happiness meter start
		meterLoans = 0, //placeholder for loan meter start
		selectedCollegeCost,
		meterConnections = 500, //placeholder for connections meter start
		meterCoinWaitTimeout = 1500,
		currentView, //what template is currently displaying
		optOn = false,
		currentOutcomeIndex,
		currentSectionOutcome,
		previousChallengesIndex,
		createDisplay,
		majorsArray,
		allMajorsArray,
		selectedMajor,
		outcomeChallengeTypes,
		outcomeChallengeTypesMap = {},
		loadedStates, //array of states
		gpaInputs, //array of gpa
		extraInputs, //arry of extracurriculars
		selectedState, //state selected
		timerForLoanTicker = 2.5,
		loanTickerCurrentlyRunning = false,
		registerClassesTimer = 30000,
		gradSchool = false,
		hadGradSchoolQuestion = false,
		inCommunityCollege = false,
		firstSelectedCommunityCollege = false,
		registerProgressTimer,
		registerPercentage = 0,
		registerBar,
		whackAMoleCorrectGuesses,
		whackAMoleMissedGuesses,
		whackAMoleWrongGuesses,
		whackAMoleCounter,
		whackAMoleTimeout,
		whackAMoleOptions,
		whackAMoleContainer,
		whackAMoleProgressBar,
		whackAMolePercentage = .5,
		whackAMoleClickDisabled = true,
		whackAMoleBackgroundOrBackgroundImage = '',
		disableTooltips = false,
		whackAMoleLoopTimes = 20,
		whackAMoleTimerMin = 800,
		whackAMoleTimerMax = 1250,
		shoppingCartItems = [{
			imageUrl: 'images/bath-towel.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'toalla esponjosa',
					label: 'fluffy towel',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 20
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/basket.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'canasta para la ropa sucia',
					label: 'laundry basket',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 15
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/pillows.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'almohadas de plumas',
					label: 'down pillows',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 60
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/supplies.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'bandeja elegante para la ducha',
					label: 'fancy shower caddy',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 25
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/entertainment.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'HDTV de 32"',
					label: '32" HDTV',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 200
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/gaming.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'consola de videojuegos',
					label: 'game system',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 300
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/plant.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'árbol de ficus',
					label: 'ficus tree',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 40
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/rug.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'tapete de colores vivos',
					label: 'colorful rug',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 40
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/desk-lamp.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'lámpara para estudiar',
					label: 'study lamp',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 25
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/clean-towels.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'Sábanas de 800 de hilos',
					label: '800 thread count sheets',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 60
						}
					}]
				}
			}]
		},
		{
			imageUrl: 'images/trash.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'basurero pequeño',
					label: 'small trashcan',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 20
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/refrigerator.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'minirrefrigerador',
					label: 'mini fridge',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 100
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/office-supplies.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'útiles escolares',
					label: 'school supplies',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 30
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/basketball.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'juego de baloncesto tipo nerf',
					label: 'nerf basketball set',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 30
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/storage.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'librero',
					label: 'bookshelf',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 50
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/desk.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'escritorio bueno',
					label: 'nice desk',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 300
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/painting.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'póster atractivo',
					label: 'cool poster',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 20
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/fan.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'ventilador de mesa',
					label: 'table fan',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 30
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/microwave.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'microondas',
					label: 'microwave',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 100
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/towels.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'sábanas rasposas pero económicas',
					label: 'scratchy but cheap sheets',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 20
						}
					}]
				}
			}]
		}, {
			imageUrl: 'images/coffee-maker.svg',
			ChallengeOutcomes: [{
				Outcome: {
					label_es: 'cafetera',
					label: 'coffee maker',
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 20
						}
					}]
				}
			}]
		}],
		gradSchoolChallenge = {
			label: 'Many people with your major go to grad school. What about you?',
			label_es: 'Mucha gente con su especialización van a la universidad de posgrado. ¿Y usted?',
			ChallengeOutcomes: [
				{
					Outcome: {
						label_es: 'Yo también.',
						label: 'Me Too.',
						message: 'Your lifetime earning prospects will be higher, but you\'ll also be racking up a lot more debt.',
						message_es: 'Las posibilidades de ganar más han aumentado, pero tendrá más deudas.',
						OutcomeValues: []
					}

				},
				{
					Outcome: {
						label_es: 'Ni hablar',
						label: 'No Way',
						message: 'You\'ll incur much less debt and start earning earlier, but you might find yourself under-qualified for many positions.',
						message_es: 'Tendrá menos deudas y empezará a ganar dinero más pronto, pero tal vez se encuentre en una situación en la que no tiene las credenciales suficientes para muchos puestos.',
						OutcomeValues: [{
							Value: {
								label: 'Connections',
								amount: -100
							}
						}]
					}
				}
			]
		};

	//btn clicks
	window.clickTitle = clickTitle;
	window.clickMessage = clickMessage;
	window.clickOutcome = clickOutcome;
	window.clickMajor = clickMajor;
	window.clickSlider = clickSlider;
	window.clickStartRegisterClasses = clickStartRegisterClasses;
	window.clickShoppingItem = clickShoppingItem;
	window.clickShoppingCart = clickShoppingCart;
	window.clickShoppingStart = clickShoppingStart;
	window.clickPsychologyStudyOption = clickPsychologyStudyOption;
	window.clickWhackAMoleStartMessage = clickWhackAMoleStartMessage;
	window.clickWhackAMoleOption = clickWhackAMoleOption;
	window.clickWhackAMoleStartGame = clickWhackAMoleStartGame;
	window.clickGradSchool = clickGradSchool;
	window.explanationScreenOpen = explanationScreenOpen;
	window.explanationScreenClose = explanationScreenClose;
	window.aboutScreenOpen = aboutScreenOpen;
	window.aboutScreenClose = aboutScreenClose;
	window.clickToStartFirstQuestion = clickToStartFirstQuestion;
	window.clickTransferSchool = clickTransferSchool;
	window.clickLanguage = clickLanguage;
	window.clickTab = clickTab;
	window.downloadCertificate = downloadCertificate;
	window.downloadImage = downloadImage;
	window.shareFacebook = shareFacebook;
	window.toggleFooter = toggleFooter;

	//jquery function for accessing params from url
	$.urlParam = function (name) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results == null) {
			return null;
		}
		else {
			return decodeURI(results[1]) || 0;
		}
	}

	try {
		setLanguageOnLoad();
	} catch (e) {
		// console.log(e);
	}

	// $('.main').html(window["app-templates"]["../client/features/templates/intro" + currentLanguage + ".html"]);

	// Get IE or Edge browser version
	//this is to hide SVG animations and do only IE adjustments to svg images
	var version = detectIE(),
	isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

	if (version) {
		$('body').addClass('ie');
		var ua = window.navigator.userAgent;
		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// Edge (IE 12+) => return version number
			if(parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)) {
				$('body').addClass('edge');
			}
		}
		
	}

	if(isSafari) {
		$('body').addClass('safari');
	}

    /**
     * detect IE
     * returns version of IE or false, if browser is not Internet Explorer
     */
	function detectIE() {
		var ua = window.navigator.userAgent;

		// Test values; Uncomment to check result …

		// IE 10
		// ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

		// IE 11
		// ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

		// Edge 12 (Spartan)
		// ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

		// Edge 13
		// ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// Edge (IE 12+) => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}

	if (!Element.prototype.matches)
		Element.prototype.matches = Element.prototype.msMatchesSelector ||
			Element.prototype.webkitMatchesSelector;

	if (!Element.prototype.closest)
		Element.prototype.closest = function (s) {
			var el = this;
			var ancestor = this;
			if (!document.documentElement.contains(el)) return null;
			do {
				if (ancestor.matches(s)) return ancestor;
				ancestor = ancestor.parentElement;
			} while (ancestor !== null);
			return null;
		};

	activate();

	function startIntro() {
		//initially get the intro text in the right place
		/*TweenMax.to('.introtext1', 0, {
			css: {
                y: '100%'
                
			}
		});*/
		TweenMax.to('.introtext2', 0, {
			css: {
				x: '100%'
			}
		});
		//letting the page load for a 1/10 of a second 
		setTimeout(function(){
			drawIntroLine1();
			drawIntroLine2();
			//play the intro animation
			playIntroTimeline();
		}, 100);
		
	}

	function urlParam(name) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results == null) {
			return null;
		}
		else {
			return decodeURI(results[1]) || 0;
		}
	}

	/*
			Function to carry out the actual PUT request to S3 using the signed request from the app.
		*/
	function uploadFile(dataUrlJpeg, signedRequest, url) {
		return new Promise(function (resolve, reject) {
			// var buf = new Buffer(image.replace(/^data:image\/\w+;base64,/, ""),'base64');
			// var data = {
			// 	Key: FileName,
			// 	Body: buf,
			// 	ContentEncoding: 'base64',
			// 	ContentType: 'image/jpeg'
			// };
			$.ajax({
				type: 'PUT',
				url: signedRequest,
				contentType: 'image/jpeg',
				ContentEncoding: 'base64',
				processData: false,
				crossDomain: true,
				data: dataURItoBlob(dataUrlJpeg),
				success: function (resp) {
					// console.log(resp);
					resolve(url);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					// console.log('Upload error: ' + XMLHttpRequest.responseText);
					// toastr.error('Unable to upload to s3');
				}
			});
		});
	}

	function dataURItoBlob(dataURI) {
		var binary = atob(dataURI.split(',')[1]);
		var array = [];
		for (var i = 0; i < binary.length; i++) {
			array.push(binary.charCodeAt(i));
		}
		return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
	}

	/*
		  Function to get the temporary signed request from the app.
		  If request successful, continue to upload the file using this signed
		  request.
		*/
	function getSignedRequest(dataUrlJpeg) {
		return new Promise(function (resolve, reject) {
			$.ajax({ type: 'GET', url: '/s3-player-score?file-type=image/jpeg' })
				.then(function (data) {
					data = JSON.parse(data);
					uploadFile(dataUrlJpeg, data.signedRequest, data.url)
						.then(function (url) {
							resolve(url);
						})
						.catch(function (err) {
							reject(err);
						});
				})
				.catch(function (err) {
					// console.log(err);
					reject(err);
				});
		});
	}

	function downloadImage(signedUrl) {
		$('#endFrame').addClass('bck-' + currentSectionIndex);
		$('#endFrame').addClass('background-panel');
		domtoimage.toJpeg(document.getElementById('endFrame'), { quality: 1 })
			.then(function (dataUrl) {
				getSignedRequest(dataUrl);
			})
			.catch(function (err) {
				// console.log(err);
			});
	}

	function activate() {
		startIntro();
		$('.startBtn').on('click', goToInputs);
		//initiate functions

		//call the colleges based on dropdowns
		$('.collegeBtn').on('click', getCollegeResults);
		//for majors question click
		// $('#main-wrapper').on('click', '.major-group', majorClick);
		//add grad school indicator for final screen
		$('#main-wrapper').on('click', '.gradOpt .opt', gradClick);
		//add cost of college for each new year
		$('#main-wrapper').on('click', '.addDebt .opt', addCollegeCost);
		//activate click options
		$('#main-wrapper').on('click', '#collegeOptions .options', getCollegeId);
		//tracking on end screens
		$('#main-wrapper').on('click', '.endBtn .opt', trackEndScreens);
		//tab click on end screen
		// $('#main-wrapper').on('click', '.tabBtn', clickTab);
		//for info screens
		//$('#aboutScreen .copy').html(window["app-templates"]["../client/features/templates/about.html"]);
		$('#orientation .copy').html(window["app-templates"]["../client/features/templates/orientation" + currentLanguage + ".html"]);
		//$('#main-wrapper').on('click', '.info-icon', explanationScreenOpen);
		//$('.about-icon').on('click', aboutScreenOpen);
		//$('#infoScreen .closeBtn').on('click', explanationScreenClose);
		//$('#aboutScreen .closeBtn').on('click', aboutScreenClose);
		// facebookShare();

		getGpaRanges()
			.then(function (gpaRanges) {
				gpaInputs = new Object(gpaRanges);
				isReady();
			})
			.catch(function (err) {
				console.log(err);
			});

		getStates()
			.then(function (states) {
				loadedStates = new Object(states);
				isReady();
			})
			.catch(function (err) {
				console.log(err);
			});

		getExtracurriculars()
			.then(function (extraCurriculars) {
				extraInputs = new Object(extraCurriculars);
				isReady();
			})
			.catch(function (err) {
				console.log(err);
			});

		getMajors()
			.then(function (majors) {
				allMajorsArray = new Object(majors);
			})
			.catch(function (err) {
				console.log(err);
			});

		getOutcomeChallengeTypes()
			.then(function (outcomeChallengeTypes) {
				outcomeChallengeTypes = new Object(JSON.parse(outcomeChallengeTypes));
				for (var i = 0, len = outcomeChallengeTypes.length; i < len; i++) {
					outcomeChallengeTypesMap[outcomeChallengeTypes[i].id] = outcomeChallengeTypes[i].type;
				}
			})
			.catch(function (err) {
				console.log(err);
			})

		facebookShare();
	}

	function isReady() {
		//we aint ready yet
		if (!gpaInputs || !loadedStates || !extraInputs) {
			return;
		}
		getInputs();
		//now we ready run our code
		// console.log('ready');
		initLoaded = true;
	}

	function analtyicsIntroAnimation() {
		//User has loaded the main page w/ intro animations
		ga('send', 'event', 'Game', 'Intro', 'Animation');
	}

	function updateLanguage() {
		setLanguageInUrl();
	}

	function setLanguageOnLoad() {
		if (!languageOn) {
			currentLanguage = '';
			$('#language-selector').hide();
			return;
		}
		if (!$.urlParam('lang')) {
			currentLanguage = '';
			$("#language-selector span:contains('EN')").addClass('selected');
		} else if ($.urlParam('lang').toLowerCase() === 'es') {
			currentLanguage = '_es';
			$("#language-selector span:contains('ES')").addClass('selected');
			$('body').addClass('langEs');
		} else {
			currentLanguage = '';
			$("#language-selector span:contains('EN')").addClass('selected');
		}

	}

	function setLanguageInUrl() {
		if (currentLanguage.length === 0) {
			$('body').removeClass('langEs');
			window.history.replaceState(null, null, "");
		} else {
			$('body').addClass('langEs');
			window.history.replaceState(null, null, "?lang=es");
		}
	}

	function playIntroTimeline() {
		introAnimation = new TimelineMax({
			delay: .5,
			onStart: analtyicsIntroAnimation,
			onComplete: introCompletion,
			onCompleteParams: ['start']
		});
		introAnimation
			/*.to('.introtext1', 1, {
				css: {
                    y:'0%'
				},
				ease: Power1.easeOut
			})*/
			.to('.svg-intro1-anim svg polyline.path', 2.5, {
				drawSVG: "0% 100%",
				ease: Power0.easeNone
			})
			.to('.introtext1', 1, {
				css: {
					x: '-100%'
				},
				ease: Power0.easeNone
			})
			.to('.svg-intro1-anim', 1, {
				css: {
					x: '-100%'
				},
				ease: Power0.easeNone,
				onComplete: function () {
					$('.svg-intro1-anim').css('opacity', 0);
					$('.svg-intro2-anim').css('opacity', 1);
				}
			}, '-=1')
			.to('.introtext2', 1, {
				css: {
					x: '0%'
				},
				ease: Power0.easeNone
			}, '-=1')
			.to('.svg-intro2-anim svg polyline.path', 2.5, {
				drawSVG: "0% 100%",
				ease: Power0.easeNone
			})
			.to('.introtext2', 1, {
				css: {
					y: '-100%'
				},
				ease: Power0.easeNone
			})
			.to('.svg-intro2-anim', 1, {
				css: {
					y: '-100%'
				},
				ease: Power0.easeNone,
				onComplete: function () {
					$('.svg-intro2-anim').css('opacity', 0);
				}
			}, '-=1')
			.to('#start', 1, {
				css: {
					y: '-100%'
				},
				ease: Power0.easeNone
			}, '-=1');
	}


	function drawIntroLine1() {
		var points, svgAnim, x1, x2, x3, y1, y2, y3, viewboxW, viewboxH, height = $(window).height, width = $(window).width(), $text = $('#intro-text-1'), textHeight = $text.height(), textWidth = $text.width();

		x1 = Math.floor($(window).width() / 2);
		y1 = Math.floor($(window).height() * .4);
		// if(currentLanguage.length == 0) {
		// 	x2 = Math.floor(x1 - 400);
		// 	x3 = Math.floor(x1 + 400);
		// } else {
		// 	x2 = Math.floor(x1 - ((width - textWidth) - 300));
		// 	x3 = Math.floor(x1 + ((width - textWidth) - 300));
		// }
		x2 = Math.floor(x1 - (textWidth/2) - 50);
		x3 = Math.floor(x1 + (textWidth/2) + 50);
		y2 = Math.floor($(window).height() * .6);
		y3 = Math.floor($(window).height() / 2);

		viewboxW = $(window).width();
		viewboxH = $(window).height();

		points = x1 + ',0,';
		points += x1 + ',' + y1 + ',';
		points += x2 + ',' + y1 + ',';
		points += x2 + ',' + y2 + ',';
		points += x3 + ',' + y2 + ',';
		points += x3 + ',' + y3 + ',';
		points += viewboxW + ',' + y3;

		svgAnim = '<svg version="1.1" id="intro1-anim" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + viewboxW + ' ' + viewboxH + '" preserveAspectRatio="xMidYMin slice"><polyline id="outline-path" class="path" points=' + points + ' /><polyline id="outline" class="line" points=' + points + ' /></svg>';

		$('#animate-intro').append('<div class="svg-intro1-anim"></div>');

		$('#animate-intro .svg-intro1-anim').append(svgAnim);
	}

	function drawIntroLine2() {
		var points, svgAnim, x1, x2, x3, y1, y2, y3, viewboxW, viewboxH, height = $(window).height, width = $(window).width(), $text = $('#intro-text-2'), textHeight = $text.height(), textWidth = $text.width();

		y1 = Math.floor($(window).height() / 2);
		y2 = Math.floor($(window).height() * .4);
		y3 = Math.floor($(window).height() * .6);
		x3 = Math.floor($(window).width() / 2);

		x1 = Math.floor(x3 - (textWidth/2) - 50);
		x2 = Math.floor(x3 + (textWidth/2) + 50);
		
		viewboxW = $(window).width();
		viewboxH = $(window).height();

		points = '0' + ',' + y1 + ',';
		points += x1 + ',' + y1 + ',';
		points += x1 + ',' + y2 + ',';
		points += x2 + ',' + y2 + ',';
		points += x2 + ',' + y3 + ',';
		points += x3 + ',' + y3 + ',';
		points += x3 + ',' + viewboxH;

		svgAnim = '<svg version="1.1" id="intro2-anim" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + viewboxW + ' ' + viewboxH + '" preserveAspectRatio="xMidYMin slice"><polyline id="outline-path" class="path" points=' + points + ' /><polyline id="outline" class="line" points=' + points + ' /></svg>';

		$('#animate-intro').append('<div class="svg-intro2-anim"></div>');

		$('#animate-intro .svg-intro2-anim').append(svgAnim);

	}



	function introCompletion($destination) {

		addActive($destination);

		var elm = $('#start .header-logo');
		drawMiniGameLines(elm, 80, 60, 50, '.active');

	}

	function removeSVGLine($svgClass, delay) {
		var intervalAmt = delay * 1000,
			interval;
		if ($('.main').hasClass('previous')) {
			interval = setInterval(function () {
				$('.svg-masBtm-anim').remove();
				clearInterval(interval);
			}, intervalAmt);
		} else {
			interval = setInterval(function () {
				$($svgClass).remove();
				clearInterval(interval);
			}, intervalAmt);
		}
	}

	$(window).resize(function () {
		var id = $('.active').attr('id');
		switch (id) {
			case 'intro-form':
				//determineIntroLinePosition();
				break;
			case 'collegeOptions':
				determineInputLinePosition();
				break;
			case 'meter-intro':
				var selectedCollege = $('#collegeOptions .optionWrap.selected-college').index();
				determineResizeCollegeLinePosition(selectedCollege);
				break;
		}
		if ($('.current').length > 0 && $('#intro').length > 0) {
			determineMascotLinePosition();
		}
	});

    /*function determineIntroLinePosition() {
        var headerP = $('.header').position().top,
            btnP = $('.startBtn').position().top,
            eleP = Math.floor(headerP) + Math.floor(btnP);

        determineIntroLineLength(eleP);

        $('.svg-intro-anim').css({'top': eleP});
    }

    function determineIntroLineLength($elementPosition) {
        var svgP = Math.floor($('.svg-form-anim').position().top) - 20,
            winH = Math.floor(window.innerHeight),
            lineH = (winH - $elementPosition) + svgP,
            svgIntroAnim = $('.svg-intro-anim');

        svgIntroAnim.find('svg').attr('viewBox', '0 0 3 ' + lineH);
        svgIntroAnim.find('svg line').attr('y2', lineH);
        svgIntroAnim.css({'height' : lineH});
    }*/

	function determineInputLinePosition() {
		var btnP = $('.collegeBtn').position().top + 50; //add margin

		determineInputLineLength(btnP);

		$('.svg-input-anim').css({ 'top': btnP });
	}

	function determineInputLineLength($elementPosition) {
		var questionP = $('.questionWrapper').position().top,
			winH = Math.floor(window.innerHeight),
			lineH = (winH - $elementPosition) + questionP,
			svgInputAnim = $('.svg-input-anim svg');

		svgInputAnim.attr('viewBox', '0 0 3 ' + lineH);
		svgInputAnim.find('line').attr('y2', lineH);
	}

	function determineCollegeLinePosition($selectedOpt) {
		var element = $('#collegeOptions .optionWrap').eq($selectedOpt);

		//have to get answers position and individual position
		var answers = $('#collegeOptions .answers'),
			position = answers.position(),
			elementL = element.position().left + 20, //add in margin for options
			elementW = element.find('.options').width(),
			elementH = element.height(),
			nelementH,
			lineT,
			lineL;

		if (element.find('.opt-anim').hasClass('opt-first') || element.find('.opt-anim').hasClass('opt-last')) {
			nelementH = elementH - 120; //offset -50 margin
		} else {
			nelementH = elementH + 15;
		}

		lineT = position.top + nelementH;
		lineL = position.left + elementL + (elementW / 2);
		determineCollegeLineLengths(lineT, lineL);
	}

	function determineResizeCollegeLinePosition($selectedOpt) {
		var element = $('#collegeOptions .optionWrap').eq($selectedOpt);

		//have to get answers position and individual position
		var answers = $('#collegeOptions .answers'),
			position = answers.position(),
			elementL = element.position().left + 20, //add in margin for options
			elementW = element.find('.options').width(),
			elementH = element.height(),
			nelementH,
			lineT,
			lineL;

		if (element.find('.opt-anim').hasClass('opt-first') || element.find('.opt-anim').hasClass('opt-last')) {
			nelementH = elementH - 120; //offset -50 margin
		} else {
			nelementH = elementH + 15;
		}

		lineT = position.top + nelementH;
		lineL = position.left + elementL + (elementW / 2);
		determineResizeCollegeLineLengths(lineT, lineL);
	}

	function determineCollegeLineLengths($svgPositionTop, $svgPositionLeft) {
		var winH = $(window).innerHeight(),
			winW = $(window).innerWidth(),
			winHalf = winW / 2,
			topLineH = (winH - $svgPositionTop) - 50,
			middleLineW = Math.floor(winHalf - $svgPositionLeft),
			svgTop = $('.svg-college-anim .top-anim svg'),
			svgMiddle = $('.svg-college-anim .middle-anim'),
			svgBottom = $('.svg-college-anim .bottom-anim'),
			svgMascot = $('.svg-mascotline-anim'),
			svgMascotBottom = $('.svg-mascotline-anim .bottom-anim');

		svgTop.attr('viewBox', '0 0 3 ' + topLineH);
		svgTop.find('line').attr('y2', topLineH);

		if (middleLineW < 0) {
			//make the width not negative
			middleLineW = middleLineW * -1;
			//rotate the line to animate properly
			TweenMax.to('.svg-college-anim .middle-anim', 0, { rotation: 180 });
			$svgPositionLeft = $svgPositionLeft - middleLineW;
			//add margin
			$('.svg-college-anim .top-anim').css({ 'margin-left': middleLineW });
		} else {
			$('.svg-college-anim .bottom-anim').addClass('leftOpt');
			$('.svg-college-anim .middle-anim').addClass('leftOpt');
		}

		svgMiddle.css({ 'width': middleLineW });
		svgMiddle.find('svg').attr('viewBox', '0 0 ' + middleLineW + ' 3');
		svgMiddle.find('svg line').attr('x2', middleLineW);

		svgMascot.css({
			'left': winHalf - 227 //227 is fixed width of line
		});

		var meterTop = $('.meterIntro').position().top,
			mascotTop = $('.svg-mascot-anim').position().top,
			mascotLine;

		if (mascotTop < 0) {
			mascotLine = (meterTop + mascotTop) - 28;
		} else {
			mascotLine = (meterTop - mascotTop) - 28;
		}

		svgMascotBottom.find('svg').attr('viewBox', '0 0 3 ' + mascotLine);
		svgMascotBottom.find('svg line').attr('y2', mascotLine);

		$('.svg-college-anim').css({
			'top': $svgPositionTop,
			'left': $svgPositionLeft
		});
	}

	function determineResizeCollegeLineLengths($svgPositionTop, $svgPositionLeft) {
		var winH = $(window).innerHeight(),
			winW = $(window).innerWidth(),
			winHalf = winW / 2,
			topLineH = (winH - $svgPositionTop) - 50,
			middleLineW = Math.floor(winHalf - $svgPositionLeft),
			svgTop = $('.svg-college-anim .top-anim svg'),
			svgMiddle = $('.svg-college-anim .middle-anim'),
			svgBottom = $('.svg-college-anim .bottom-anim'),
			svgMascot = $('.svg-mascotline-anim'),
			svgMascotBottom = $('.svg-mascotline-anim .bottom-anim');

		svgTop.attr('viewBox', '0 0 3 ' + topLineH);
		svgTop.find('line').attr('y2', topLineH);

		if (middleLineW < 0) {
			//make the width not negative
			middleLineW = middleLineW * -1;
			//rotate the line to animate properly
			TweenMax.to('.svg-college-anim .middle-anim', 0, { rotation: 180 });
			$svgPositionLeft = $svgPositionLeft - middleLineW;
			//add margin
			$('.svg-college-anim .top-anim').css({ 'margin-left': middleLineW });
		} else {
			$('.svg-college-anim .bottom-anim').addClass('leftOpt');
			$('.svg-college-anim .middle-anim').addClass('leftOpt');
		}

		svgMiddle.css({ 'width': middleLineW });
		svgMiddle.find('svg').attr('viewBox', '0 0 ' + middleLineW + ' 3');
		svgMiddle.find('svg line').attr('x2', middleLineW);

		svgMascot.css({
			'left': winHalf - 227 //227 is fixed width of line
		});

		var meterTop = $('.meterIntro').position().top,
			mascotTop = $('.svg-mascot-anim').position().top,
			mascotLine;

		if (mascotTop < 0) {
			mascotLine = (meterTop + mascotTop);
		} else {
			mascotLine = (meterTop - mascotTop);
		}

		svgMascotBottom.find('svg').attr('viewBox', '0 0 3 ' + mascotLine);
		svgMascotBottom.find('svg line').attr('y2', mascotLine);

		$('.svg-college-anim').css({
			'top': $svgPositionTop,
			'left': $svgPositionLeft
		});
	}

	function determineMascotLinePosition() {
		var winW = $(window).innerWidth(),
			winH = $(window).innerHeight(),
			circle = $('.svg-mascot-anim'),
			svgLine = $('.svg-masBtm-anim'),
			mascotWrapP = $('.meterIntro').position(),
			circleP = circle.position(),
			circleW = circle.width(),
			circleH = circle.height(),
			circleT = (mascotWrapP.top + circleP.top) - 28,
			circleB = (circleT + circleH) + 90,
			mLeft = (winW / 2) - 227;

		svgLine.css({
			'top': circleB,
			'left': mLeft
		});
		svgLine.find('.bottom-anim').css({
			'margin-left': 227
		});

		var questionP = $('.questionWrapper').position(),
			mBtm = (winH - circleB - 50);

		svgLine.find('.bottom-anim svg').attr('viewBox', '0 0 3 ' + mBtm);
		svgLine.find('.bottom-anim svg line').attr('y2', mBtm);
	}

	function drawFirstQuestionLines() {
		TweenMax.to('.optionWrap .svg-opt-anim svg line.path', .5, { drawSVG: "0% 100%" });
	}

	function addActive($destination) {
		$('.active').removeClass('active');
		$('#' + $destination).addClass('active');
	}

	function getInputs() {
		//populate all select inputs
		//GPA
		for (var i = 0; i < gpaInputs.length; i++) {
			var gpa = gpaInputs[i].label;
			var gpaId = gpaInputs[i].id;
			$('.gpalist').append('<option value="' + gpaId + '">' + gpa + '</option>');
		}

		//State
		for (var i = 0; i < loadedStates.length; i++) {
			var state = loadedStates[i].state;
			var stateId = loadedStates[i].id;
			$('.statelist').append('<option value="' + stateId + '">' + state + '</option>');
		}

		//Extracurriculars
		for (var i = 0; i < extraInputs.length; i++) {
			var extracurricular = extraInputs[i].label;
			var exId = extraInputs[i].id;
			if(currentLanguage == '_es') {
				switch(extracurricular.toLowerCase()) {
					case 'high':
					extracurricular = 'Muchos';
					break;
					case 'medium':
					extracurricular = 'Medio';
					break;
					case 'low':
					extracurricular = 'Pocos';
					break;
				}
			}
			$('.extralist').append('<option value="' + exId + '">' + extracurricular + '</option>');
		}

		//get selected paths to make inital answers
		getSelectedPaths()
			.then(function (data) {
				data = JSON.parse(data);
				for (var i = 0; i < data.length; i++) {
					if (i == 0) {
						$('#collegeOptions .answers').append('<div class="optionWrap"><div class="opt-anim opt-first"><svg version="1.1" id="option-anim" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 3 200" preserveAspectRatio="xMidYMin slice"><line id="straight-down-path" class="path" x1="1.5" y1="0" x2="1.5" y2="200"/><line id="straight-down" class="line" x1="1.5" y1="0" x2="1.5" y2="200"/></svg></div><div class="options opt-' + i + '" data-index="' + i + '" data-id="" data-direction=""></div><div class="info-icon mobile-hide" data-info="" onclick="explanationScreenOpen(this, event)"><div class="icon">i</div></div></div>');
					} else if (i == (data.length - 1)) {
						$('#collegeOptions .answers').append('<div class="optionWrap"><div class="opt-anim opt-last"><svg version="1.1" id="option-anim" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 3 200" preserveAspectRatio="xMidYMin slice"><line id="straight-down-path" class="path" x1="1.5" y1="0" x2="1.5" y2="200"/><line id="straight-down" class="line" x1="1.5" y1="0" x2="1.5" y2="200"/></svg></div><div class="options opt-' + i + '" data-index="' + i + '" data-id="" data-direction=""></div><div class="info-icon mobile-hide" data-info="" onclick="explanationScreenOpen(this, event)"><div class="icon">i</div></div></div>');
					} else {
						$('#collegeOptions .answers').append('<div class="optionWrap"><div class="opt-anim"><svg version="1.1" id="option-anim" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 3 200" preserveAspectRatio="xMidYMin slice"><line id="straight-down-path" class="path" x1="1.5" y1="0" x2="1.5" y2="200"/><line id="straight-down" class="line" x1="1.5" y1="0" x2="1.5" y2="200"/></svg></div><div class="options opt-' + i + '" data-index="' + i + '" data-id="" data-direction=""></div><div class="info-icon mobile-hide" data-info="" onclick="explanationScreenOpen(this, event)"><div class="icon">i</div></div></div>');
					}
				}
			})
			.catch(function (err) {
				console.log(err);
			});

		//Payback logo has come in with CTA
		ga('send', 'pageview', '/intro-branded');
		ga('send', 'event', 'Game', 'Intro', 'Logo');
	}

	//transition to intro application form
	function goToInputs() {
		var panelID = $('.active').attr('id');
		var $destination = $(this).attr('data-destination');

		TweenMax.to('#' + panelID, 1, {
			y: '-=100%',
			onStart: function () {
				var lineElm = $('#start .header-logo');
				drawMiniGameLinesOut('down', lineElm, 50, '#start');
			}
		});
		addActive($destination);
		TweenMax.to('#' + $destination, 1, {
			y: '-=100%',
			onComplete: function () {
				var elm = $('#intro-form .form-txt');
				drawMiniGameLines(elm, 80, 120, 197, '#intro-form');
			}
		});

		//User prompted to answer GPA, extracurricular and state questions. Only one page view needed, but multiple events triggers are needed.
		ga('send', 'pageview', '/user-questions');
	}

	function animateDebtMeter() {
		calculateLoanAndApplyChange(selectedCollegeCost);
		animateContinueForMascot();
		// loadAllSectionsAndChallengesBySectionId(currentSection);
		// $('.mascotBtn').on('click', clickToStartFirstQuestion);

		//animateMeterValues('loans', selectedCollegeCost);
	}

	function animateContinueForMascot() {
		if (!allSectionsLoaded) {
			setTimeout(function () {
				animateContinueForMascot();
			}, 100);
		} else {
			var animateContinueBtn = new TimelineMax();
			animateContinueBtn.to('.mascotBtn', 0, { css: { display: 'inline-block' } })
				.to('.mascotPlaceholder', 0, { css: { display: 'none' } })
				.to('.mascotBtn', .5, { opacity: 1 })
		}
	}

	function loadFooter() {
		// $('footer').html(window["app-templates"]["../client/features/templates/footer" + currentLanguage + ".html"]);

		// if (currentCollege != undefined) {
			switch (currentCollege.prestige) {
				case 5:
					meterConnections = meterConnections + 200;
					break;
				case 4:
					meterConnections = meterConnections + 100;
					break;
				case 3:
					break;
				case 2:
					meterConnections = meterConnections - 100;
					break;
				case 1:
					meterConnections = meterConnections - 200;
					break;
			}
		// } else {
		// 	$('.overlay').addClass('hidden');
		// 	$('.tooltip').css('display', 'none');
		// 	return;
		// }

		$('footer .meter-connections .value').css('width', meterConnections / 10 + '%')

		$('.meter-focus').attr('data-value', meterFocus);
		$('.meter-happiness').attr('data-value', meterHappiness);
		$('.meter-connections').attr('data-value', meterConnections);
		$('.meter-loans').attr('data-value', meterLoans);
		//animate footer into screen
		var footerAnimation = new TimelineMax({ onComplete: animateDebtMeter });
				// topVal = currentLanguage == '_es' ? -84 : -61;
		
		function determineTopVal() {
			let topVal;
			if ($(window).width() > 813) {
				topVal = currentLanguage == '_es' ? -84 : -61;
			} else {
				topVal = 0;
			}
			return topVal;
		}
		
		footerAnimation.to('footer', .75, { css: { bottom: '0%' }, ease: Power1.easeOut })
			.staggerTo('.barWrapper .tooltip', .75, { css: { top: determineTopVal(), opacity: 1 }, ease: Power1.easeOut }, .5);
	}

	function moveFooter(bottomPercentage) {
		bottomPercentage = bottomPercentage ? bottomPercentage : '0%';
		var footerAnimation = new TimelineMax();
		footerAnimation.to('footer', .75, { css: { bottom: bottomPercentage }, ease: Power1.easeOut });
	}

	function hideToolTips() {
		TweenMax.to('.barWrapper .tooltip', .5, { css: { opacity: 0 } });

		$('.barWrapper').hover(function () {
			if (!disableTooltips) {
				$(this).find('.tooltip').animate({
					'opacity': 1
				}, 100);
			}
		}, function () {
			$(this).find('.tooltip').animate({
				'opacity': 0
			}, 100);
		});
	}

	function hideFooter() {
		//hide tooltips
		$('.barWrapper .tooltip').hide();
		var footerAnimation = new TimelineMax();
		footerAnimation.to('footer', .75, { css: { bottom: '-50px' }, ease: Power1.easeOut });
	}

	function explanationScreenOpen(elm, e) {
		if (!$(elm).hasClass('disabled')) {
			var i = $(elm).attr('data-info'),
				$copy;
			switch (i) {
				case 'extracurricular':
					$copy = window["app-templates"]["../client/features/templates/extracurricular.help" + currentLanguage + ".html"];
					break;
				case 'In-State Public':
				case 'Out-of-State Public':
				case 'Private School':
				case 'Community College':
					$copy = window["app-templates"]["../client/features/templates/schools.help" + currentLanguage + ".html"];
					break;
				default:
				$copy = window["app-templates"]["../client/features/templates/schools.help" + currentLanguage + ".html"];
				break;
			}

			$('#infoScreen .copy').html($copy);

			var modal = new TimelineMax();
			modal.to('#infoScreen', 0, { y: '-100%' })
				.to('#infoScreen .content', 0, { y: '500%' })
				.to('#infoScreen', .25, { opacity: 1 })
				.to('#infoScreen .content', .5, { y: '0%' });
		}
	}

	function explanationScreenClose() {
		var closeModal = new TimelineMax();
		closeModal.to('#infoScreen .content', .5, { y: '-500%' })
			.to('#infoScreen', .25, { opacity: 0 })
			.to('#infoScreen', 0, { y: '0%' })
			.to('#infoScreen .content', 0, { y: '500%' });
	}

	function aboutScreenOpen(elm, e) {
		$('#aboutScreen .copy').html(window["app-templates"]["../client/features/templates/general.help" + currentLanguage + ".html"]);
		var modal = new TimelineMax();
		modal.to('#aboutScreen', 0, { y: '-100%' })
			.to('#aboutScreen .content', 0, { y: '200%' })
			.to('#aboutScreen', .25, { opacity: 1 })
			.to('#aboutScreen .content', .5, { y: '0%' });
	}

	function aboutScreenClose() {
		var closeModal = new TimelineMax();
		closeModal.to('#aboutScreen .content', .5, { y: '-200%' })
			.to('#aboutScreen', .25, { opacity: 0 })
			.to('#aboutScreen', 0, { y: '0%' })
			.to('#aboutScreen .content', 0, { y: '200%' });
	}

	function calculateLoanAndApplyChange(newAmount) {
		// [CAD] - Possibly remove this cap!
		//if (newAmount < 0)
		//  newAmount = 0;
		if (loanTickerCurrentlyRunning) {
			setTimeout(function () {
				calculateLoanAndApplyChange(newAmount);
			}, timerForLoanTicker * 1000);
			return;
		}
		loanTickerCurrentlyRunning = true;
		var options = {
			useEasing: true,
			useGrouping: true,
			separator: ',',
			decimal: '.',
		};
		var demo = new CountUp("meter-loan-value", meterLoans, newAmount, 0, timerForLoanTicker, options);
		demo.start();
		meterLoans = newAmount;
		$('.meter-loans').attr('data-value', meterLoans);
		setTimeout(function () {
			loanTickerCurrentlyRunning = false;
		}, timerForLoanTicker * 1000);
	}

	function setSelectedById(arr, id) {
		var obj;
		for (var i = 0, len = arr.length; i < len; i++) {
			if (arr[i].id == id) {
				obj = arr[i];
				break;
			}
		}
		return obj;
	}

	function getCollegeResults() { //click apply button on intro form
		// if (!initLoaded) {
		// 	$('#intro-form .error').text(currentLanguage == '_es' ? "Uno o más de los campos no han sido seleccionados." : 'One or more fields have not been selected.');
		// 	$('#intro-form .error').removeClass('hide').addClass('show');
		// 	return false;
		// }
		var panelID = $('.active').attr('id'),
			$destination = $(this).attr('data-destination');
		//set first challenge index
		currentChallengesIndex = 0;
		//set first section index
		currentSectionIndex = 0;
		var $gpa = "1" , // $('.gpalist option:checked').val(),
			$state = "24", // $('.statelist option:checked').val(),
			$extra = "1",//  $('.extralist option:checked').val(),
			gpaTxt = "4.0-4.0+", //  $('.gpalist option:checked').text(),
			stateTxt = "Illinois", //  $('.statelist option:checked').text(),
			extraTxt = "High" ;// $('.extralist option:checked').text();

		//console.log('gpa: ' + gpaTxt);
		//console.log('state: ' + stateTxt);
		//console.log('extra: ' + extraTxt);

		// if ($gpa != '' || $state != '' || $extra != '') {
		// 	$('#intro-form .error').text(currentLanguage == '_es' ? "Uno o más de los campos no han sido seleccionados." : 'One or more fields have not been selected.');
		// 	$('#intro-form .error').removeClass('hide').addClass('show');
		// 	return false;
		// } else {
		$(this).addClass('disabled');
		selectedState = "Illinois"; //setSelectedById(loadedStates, $state);
		//hide error message
		$('#intro-form .error').removeClass('show').addClass('hide');
		//call for college results
		getSelectedPathsWithColleges($gpa, $extra, $state)
			.then(function (data) {
				//console.log(data);
				//add colleges
				colleges = data;
				//console.log(colleges);
				var collegeOpt = colleges.selectedPaths.length;
				//console.log('collegeOpt: ' + collegeOpt);
				//loop through the college options
				var $direction,
					collegeIndex,
					collegeData,
					promises = [];
				for (var i = 0; i < collegeOpt; i++) {
					if (collegeOpt == 1) {
						//if one option
						$direction = 'down';
					} else if (collegeOpt == 2) {
						//if two options
						if (i == 0) {
							//first option goes down
							$direction = 'down';
						} else {
							//second option goes right
							$direction = 'right';
						}
					} else {
						//if greater than or equal to 3 options
						if (i == 0) {
							//first option goes left
							$direction = 'left';
						} else if ((i > 0) && (i < (collegeOpt - 1))) {
							//if options are not first of last option go down
							$direction = 'down';
						} else {
							//if last option go right
							$direction = 'right';
						}
					}
					collegeIndex = colleges.selectedPaths[i];
					collegeData = colleges.selectedPaths[i].College;
					$('.answers .opt-' + i).attr('data-direction', $direction);
					loadCollegeDetails(i, collegeData, collegeIndex);
					// promises.push(createCollegeChallenges(collegeIndex.id, i));
				}
				// console.log('done loading images');
				//animate to the next panel
				TweenMax.to('#' + panelID, 1, { y: '-=100%', onStart: removeSVGLine, onStartParams: ['.svg-intro-anim', 0] });
				TweenMax.to('#' + $destination, 1, { y: '-=100%', onStart: determineInputLinePosition() });
				//rotate dashed lines
				TweenMax.to('.opt-anim.opt-first', 0, { rotation: 65, x: 80 });
				TweenMax.to('.opt-anim.opt-last', 0, { rotation: -65, x: -80 });



				//animate option lines
				var inputLineAnimation = new TimelineMax()
				inputLineAnimation
					.to('.svg-input-anim', 0, { opacity: 1 })
					.to('.svg-input-anim line.path', 1.75, { drawSVG: "0% 100%" })
					.to('.opt-anim line.path', .5, { drawSVG: "0% 100%" });



				addActive($destination);

			})
			.catch(function (err) {
				//TODO display err message
				console.log(err);
			});
		// }

		//User prompted to answer GPA, extracurricular and state questions. Only one page view needed, but multiple events triggers are needed.
		ga('send', 'event', 'User Input', 'GPA', gpaTxt);
		ga('send', 'event', 'User Input', 'State', stateTxt);
		ga('send', 'event', 'User Input', 'Extracurriculars', extraTxt);

		ga('send', 'pageview', '/choose-college');
	}

	function loadCollegeDetails($index, $college, $collegeIndex) {
		$('.answers .opt-' + $index).html(window["app-templates"]["../client/features/templates/optcollege" + currentLanguage + ".html"]);
		var collegeData = $collegeIndex.College,
			$id = $college.id,
			$label = $collegeIndex.label,
			$name = $college['name' + currentLanguage],
			$image = $college.imgUrl,
			$prestige = $college.prestige,
			$aid = $college.financialAid,
			$distance = $college.distanceFromHome,
			$inState = $collegeIndex.inState,
			$costValue;
		if(currentLanguage == '_es') {
			switch($label.toLowerCase()) {
				case 'in-state public':
				$label = 'Universidad pública estatal';
				break;
				case 'out-of-state public':
				$label = 'Universidad pública fuera del estado';
				break;
				case 'private school':
				$label = 'Universidad privada';
				break;
				case 'community college':
				$label = 'Colegio Comunitario';
				break;
			}
		}
		switch ($inState) {
			case 0:
				$costValue = $college.outOfStateCost;
				break;
			case 1:
				$costValue = $college.inStateCost;
				break;
		}

		try {
			if ($college._disabled) {
				$('.answers .opt-' + $index).addClass('disabled');
				$('.answers .opt-' + $index).parent().find('.info-icon').addClass('disabled');
				communityCollegeOnlyOption++;
			}
		} catch (e) {

		}

		if ($college.CollegeStates.length > 0) {
			$distance = Math.round(getMiles(getDistanceFromLatLonInKm($college.CollegeStates[0].State.lat, $college.CollegeStates[0].State.long, selectedState.lat, selectedState.long) * 1000));
		} else if ($college.lat) {
			$distance = Math.round(getMiles(getDistanceFromLatLonInKm($college.lat, $college.long, selectedState.lat, selectedState.long) * 1000));
		} else {
			$distance = 0;
		}
		if ($distance == 0) {
			$distance = randomIntFromInterval(5, 25);
		}

		var collegeDetailElm = $('.answers .opt-' + $index);
		collegeDetailElm.attr('data-id', $collegeIndex.id);
		collegeDetailElm.attr('data-college', $id);
		collegeDetailElm.find('.collegeCategory').html($label);
		collegeDetailElm.find('.collegeIcon').html('<img src="' + $image + '" alt="' + $name + '"/>');
		collegeDetailElm.find('.collegeName').html($name);
		//$('.answers .opt-' + $index + ' .prestige .value').html($prestige);
		addPrestigeStars(collegeDetailElm, $prestige);
		collegeDetailElm.find('.cost .value').html('$' + $costValue.toLocaleString());
		collegeDetailElm.find('.aid .value').html('$' + $aid.toLocaleString());
		//collegeDetailElm.find('.info-icon').attr('data-info', $label.replace(' ', '_'));
		//collegeDetailElm.find('.distance .value').html($distance);
		collegeDetailElm.parent().find('.info-icon').attr('data-info', $label);
	}

	function addPrestigeStars(elm, $num) {
		var solidStar = "<?xml version='1.0' encoding='utf-8'?><svg version='1.1' id='solidstar' x='0px' y='0px' width='100%' height='100%' viewBox='0 0 38.6 34.8' xml:space='preserve'><g><polygon class='st0' points='19.3,0 25.3,11.4 38.6,13.3 28.9,22.2 31.2,34.8 19.3,28.8 7.4,34.8 9.6,22.2 0,13.3 13.3,11.4'/></g></svg>",
			lineStar = "<?xml version='1.0' encoding='utf-8'?><svg version='1.1' id='linestar' x='0px' y='0px' width='100%' height='100%' viewBox='0 0 38.1 34.3' xml:space='preserve'><g><polygon class='st0' points='19,1.6 24.4,11.9 36.4,13.6 27.7,21.6 29.8,32.9 19,27.6 8.3,32.9 10.4,21.6 1.7,13.6 13.7,11.9'/></g></svg>";

		for (var i = 0; i < $num; i++) {
			elm.find('.prestige .value').append('<div class="starIcon solid">' + solidStar + '</div>');
		}

		if (elm.find('.prestige .value div').length < 5) {
			for (var i = 0; i < (5 - $num); i++) {
				elm.find('.prestige .value').append('<div class="starIcon outline">' + lineStar + '</div>');
			}
		}
	}

	function randomIntFromInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function getMiles(i) {
		return i * 0.000621371192;
	}

	function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2 - lat1);  // deg2rad below
		var dLon = deg2rad(lon2 - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2)
			;
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		return d;
	}

	function deg2rad(deg) {
		return deg * (Math.PI / 180)
	}

	function createCollegeChallenges($collegeID, $panelIndex) {
		return new Promise(function (resolve, reject) {
			//create college sections
			var panel = $panelIndex;
			$('#main-wrapper').append('<section id="panel-' + panel + '" class="panel bck-0" data-view="challenge"></section><div id="background-' + panel + '" class="panel background-panel bck-0"></div>');
			//this is the overall path id
			//console.log('path id: ' + $collegeID);
			var SectionId = colleges.selectedPaths[$panelIndex].SectionSelectedPaths[0].Section.id;
			//this is the specific section within the path
			//console.log('section id: ' + SectionId);
			getSectionChallengesById(SectionId)
				.then(function (data) {
					sectionChallengesMap[data.section.id] = new Object(data.section);
					challengeData = data.section.SectionChallenges;
					//console.log(challengeData);
					firstChallenge = challengeData[0].Challenge;
					var outcomes = firstChallenge.ChallengeOutcomes.length;
					insertIntoTemplate(outcomes, panel, firstChallenge);
					resolve();
				})
				.catch(function (err) {
					reject(err);
				})
		});
	}

	function disableAllCollegeClicks() {
		$('#collegeOptions .options').addClass('no-click');
	}


	function getCollegeId() {
		if ($(this).hasClass('disabled') || $(this).hasClass('no-click')) {
			//TODO. add info text of why not selectable
			// alert('can\'t pick');
			return;
		}

		disableAllCollegeClicks();

		//console.log('get college id');
		var id = $(this).attr('data-id'),
			collegeID = $(this).attr('data-college'),
			collegeAid = $(this).find('.collegeDetails .aid .value').text(),
			$i = $(this).attr('data-index'),
			collegeName;

		//add class to selected college for resizing
		$(this).parent().addClass('selected-college');

		collegeCost = $(this).find('.collegeDetails .cost .value').text();

		//console.log('$i: ' + $i);
		currentCollegePath = id;

		inCommunityCollege = colleges.selectedPaths[$i].SelectedPathCollegeType.label.toLowerCase() == 'community';
		firstSelectedCommunityCollege = colleges.selectedPaths[$i].SelectedPathCollegeType.label.toLowerCase() == 'community';
		currentCollege = colleges.selectedPaths[$i].College;
		selectedCollege = currentCollege;
		//holds the id of specific college choosen
		currentCollegeId = collegeID;

		//get number of sections are within the path
		sectionCount = colleges.selectedPaths[$i].SectionSelectedPaths.length - 1;
		//console.log('total count: ' + (sectionCount + 1) + ' - section count: ' + sectionCount);

		//get the section id within the selected path
		currentSection = colleges.selectedPaths[$i].SectionSelectedPaths[currentSectionIndex].sectionId;

		selectedPathData = {
			selectedPath: colleges.selectedPaths[$i]
		}

		//add correct debt
		//cost of aid
		var aidNumber = collegeAid.substr(1, collegeCost.length),
			aidNum = Number(aidNumber.replace(/,/g, '')),
			//cost of college
			costNumber = collegeCost.substr(1, collegeCost.length),
			costNum = Number(costNumber.replace(/,/g, ''));
		//added for each year
		selectedCollegeCost = costNum - aidNum;
		//holds total debt

		// //insert into debt meter

		$('.mascotBtn').attr('data-panel', 'panel-' + $i);


		loadAllSectionsAndChallengesBySectionId();

		//grab college name

		currentSectionIndex = 0;
		ga('send', 'event', 'User Input', 'College Path', selectedPathData.selectedPath.label);

		// if(window.location.hash.indexOf('#debug') < 0) {
		//animatePanel($panel, $direction, 0, addCurrent);
		var panelID = $('.active').attr('id');
		//console.log('destination: ' + $destination);
		//animate active viewport panelgsap
		TweenMax.to('#' + panelID, 1, {
			y: '-=100%',
			onStart: createMascotScreen,
			delay: .75
		});
		TweenMax.to('#meter-intro', 1, {
			y: '-=100%',
			delay: .75,
			onStart: removeSVGLine,
			onStartParams: ['.svg-input-anim', 0],
			onComplete: loadFooter
		});

		var collegeLines = new TimelineMax({ onStart: determineCollegeLinePosition, onStartParams: [$i], delay: .75 });
		collegeLines.to('.svg-college-anim .top-anim line.path', .5, { drawSVG: "0% 100%" })
			.to('.svg-college-anim .middle-anim line.path', .5, { drawSVG: "0% 100%" })
			.to('.svg-college-anim .bottom-anim line.path', .5, { drawSVG: "0% 100%" })
			.to('.svg-mascot-anim', 0, { rotation: -90 })
			.to('.svg-mascotline-anim .middle-anim', 0, { rotation: -180 })
			.to('.svg-mascotline-anim .middle-anim line.path', .5, { drawSVG: "0% 100%" })
			.to('.svg-mascotline-anim .bottom-anim line.path', .5, { drawSVG: "0% 100%" })
			.to('.svg-mascot-anim circle.path', 1, { drawSVG: "0% 100%" });

		addActive('meter-intro');
		ga('send', 'event', 'User Input', 'College Name', currentCollege.name);
	}

	function createMascotScreen() {
		var $selectedMessage,
			$selectedMascot,
			$selectedMascotSVG,
			$mascotTitle;
		//college path
		//console.log(selectedPathData);
		//console.log(selectedCollege);
		$selectedMascot = selectedCollege.name;

		var $selectedPath = selectedPathData.selectedPath.label;
		switch ($selectedPath) {
			case 'In-State Public':
				$mascotTitle = currentCollege['title' + currentLanguage] ? currentCollege['title' + currentLanguage] : "You're a " + $selectedMascot;
				$selectedMessage = currentLanguage != '_es' ? "You’ll be saving a ton of money on tuition and you’re still close enough to come home on the weekends. Not too bad." : "Va a poder ahorrar un montón de dinero en la matrícula y aún estará cerca de casa para visitar los fines de semana. No está tan mal.";
				break;
			case 'Out-of-State Public':
				$mascotTitle = currentCollege['title' + currentLanguage] ? currentCollege['title' + currentLanguage] : "You're a " + $selectedMascot;
				$selectedMessage = currentLanguage != '_es' ? "Some people stay close to home, but not you. While you’ll be experiencing a whole new place, you’ll also be spending more on tuition and travel." : "Algunos se quedan cerca de su hogar, pero usted no. Va a tener la experiencia de un lugar nuevo, pero también gastará más dinero en la matrícula y en los viajes.";
				break;
			case 'Private School':
				//check for pharoah or knight
				if (currentCollege.prestige === 5) {
					$mascotTitle = currentCollege['title' + currentLanguage] ? currentCollege['title' + currentLanguage] : "YOU’RE A PHAROAH!";
					$selectedMessage = currentLanguage != '_es' ? "Don’t be deterred by a private school’s high sticker price. Private universities can offer large financial aid packages that make the cost much more affordable than you’d think." : "No se asuste con el precio más alto de la universidad privada. Las universidades privadas pueden ofrecer grandes paquetes de ayuda financiera que hacen que sea más asequible de lo que piensa.";
				} else {
					$mascotTitle = currentLanguage == '_es' ? currentCollege['title' + currentLanguage] : "YOU’RE A KNIGHT!";
					$selectedMessage = currentLanguage != '_es' ? "Private school isn’t cheap and, for lower-prestige schools like this one, you might not be getting much bang for your buck." : "La universidad privada no es económica, pero en universidades de menor prestigio como esta, tal vez no reciba lo suficiente para lo que paga.";
				}
				break;
			case 'Community College':
				$mascotTitle = currentCollege['title' + currentLanguage] ? currentCollege['title' + currentLanguage] : "YOU’RE A COMMUTER!";
				if (communityCollegeOnlyOption >= 2) {
					$selectedMessage = currentLanguage != '_es' ? "Most four-year schools have minimum GPA requirements. But don’t despair. You can get on track at community college, then transfer to a four-year school as a junior." : "La mayoría de las universidades de cuatro años tienen un requisito mínimo de promedio de calificaciones. Pero no se desespere. Puede sacar buenas calificaciones en el colegio comunitario y luego transferirse en el tercer año a la universidad de cuatro años.";
					break;
				} else {
					$selectedMessage = currentLanguage != '_es' ? "Community college is an increasingly popular option to manage college costs. Many students spend two years here and then transfer to a four-year school." : "El colegio comunitario es cada vez la opción más popular para administrar los gastos universitarios. Muchos estudiantes cursan los primeros dos años aquí y luego se transfieren a la universidad de cuatro años.";
					break;
				}

		}

		$selectedMascotSVG = selectedCollege.imgUrl;

		$('.mascotImage').html("<img src=" + $selectedMascotSVG + " alt=" + $selectedMascot + " />");
		$('.mascotTitle').html($mascotTitle);
		$('.mascotCopy').html($selectedMessage);

		ga('send', 'pageview', '/mascot');
	}

	function clickToStartFirstQuestion() {
		if (!allSectionsLoaded) {
			// alert('not ready');
			return;
		}
		var $panel = $(this).attr('data-panel'),
			$direction = $(this).attr('data-direction');
		hideToolTips();
		// console.log(challengeData);
		currentView = 'firstQuestion';
		determineMascotLinePosition();
		var mascotBtmLine = new TimelineMax({ onComplete: drawFirstQuestionLines });
		mascotBtmLine.to('.svg-masBtm-anim .top-anim line.path', .5, { drawSVG: "0% 100%" })
			.to('.svg-masBtm-anim .middle-anim line.path', .5, { drawSVG: "0% 100%" })
			.to('.svg-masBtm-anim .bottom-anim line.path', .5, { drawSVG: "0% 100%" });
		globalDirection = 'down';
		insertRandomChallengesForAllSections();
		loadAndAnimateToNextSection('down', 1, addCurrent);

		ga('send', 'pageview', '/game/highschool/start');
		ga('send', 'event', 'Highschool', 'Highschool', 'Highschool');
	};

	function animatePanel($panel, $direction, $delay, onComplete) {
		//turn off opt buttons until content is loaded
		// turnBtnOff();
		var $id = $panel.replace('panel-', ''),
			$background = 'background-' + $id;
		//add the direction the panel needs to move
		$('#' + $panel).addClass('main-' + $direction);
		$('#' + $background).addClass('main-' + $direction);
		//current section index
		var $shape = '#shape-' + (typeof currentChallengesIndex != "undefined" && currentChallengesIndex === 0 && currentView == 'message' && currentSectionIndex > 0 ? currentSectionIndex - 1 : currentSectionIndex);
		//var $shape = '#shape-' + currentSectionIndex;
		//debugger;

		var currentShape;
		var nextShape;

		if (!$($shape).hasClass('show')) {
			nextShape = $shape;
			$(nextShape).addClass('show');
			$('.shape').each(function () {
				if ($(this).hasClass('show')) {
					currentShape = $(this).attr('id');
					return false;
				}
			});
		}

		switch ($direction) {
			case 'down':
				animateDown('-', $delay, $direction, $panel, onComplete, currentShape, removeShape, nextShape, $shape);
				break;
			case 'left':
				animateHorizontal('+', $delay, $direction, $panel, onComplete, currentShape, removeShape, nextShape, $shape);
				break;
			case 'right':
				animateHorizontal('-', $delay, $direction, $panel, onComplete, currentShape, removeShape, nextShape, $shape);
				break;
		}



		// If this is the end frame, hide our footer
		// [NOTE] - might not be the best place for this? where else would I make this call?
		if ($('#endFrame').length > 0 && $(window).width() > 813) {
			toggleElementVisibility();
			$('.about-icon').css({ 'color': 'white', 'border-color': 'white' });
			$('#language-selector').css('display', 'none');
			TweenLite.delayedCall(1, hideFooter, []);
		} else if ($('#endFrame').length > 0 && $(window).width() < 813) {
			toggleElementVisibility();
			$('.about-icon').css({ 'color': 'white', 'border-color': 'white' });
			$('#language-selector').css('display', 'none');
			TweenLite.delayedCall(1, moveFooter('100px'), []);
		}
	}

	function animateHorizontal(plusOrMinus, $delay, $direction, $panel, onComplete, currentShape, removeShape, nextShape, $shape) {
		//animate everything right
		var moveTo = plusOrMinus + '=100%',
			mainClass = plusOrMinus === '+' ? '.main-left' : '.main-right';
		TweenMax.to('.current', 1, {
			x: moveTo, delay: $delay
		});
		TweenMax.to('.current-background', 1, {
			x: moveTo, delay: $delay
		});
		TweenMax.to(mainClass, 1, {
			x: moveTo, delay: $delay,
			onStart: removeSVGLine,
			onStartParams: ['.previous .svg-options-anim', $delay],
			onComplete: onComplete,
			onCompleteParams: [$direction, $panel]
		});

		if (currentShape) {
			TweenMax.to('#' + currentShape, 1, { x: moveTo, delay: $delay, onComplete: removeShape, onCompleteParams: [currentShape] });
			TweenMax.to(nextShape, 1, { x: moveTo, delay: $delay });
		} else {
			TweenMax.to($shape, 1, {
				x: plusOrMinus + '=15%', delay: $delay
			});
		}
	}

	function animateDown(plusOrMinus, $delay, $direction, $panel, onComplete, currentShape, removeShape, nextShape, $shape) {
		//animate everything down
		TweenMax.to('.current', 1, {
			y: plusOrMinus + '=100%', delay: $delay
		});
		TweenMax.to('.current-background', 1, {
			y: plusOrMinus + '=100%', delay: $delay
		});
		TweenMax.to(plusOrMinus === '-' ? '.main-down' : '.main-up', 1, {
			y: plusOrMinus + '=100%', delay: $delay,
			onStart: removeSVGLine,
			onStartParams: ['.previous .svg-options-anim', $delay],
			onComplete: onComplete,
			onCompleteParams: [$direction, $panel]
		});

		if (currentShape) {
			TweenMax.to('#' + currentShape, 1, {
				y: plusOrMinus + '=100%', delay: $delay,
				onComplete: removeShape,
				onCompleteParams: [currentShape]
			});
			TweenMax.to(nextShape, 1, { y: plusOrMinus + '=100%', delay: $delay });
		} else {
			TweenMax.to($shape, 1, {
				y: plusOrMinus + '=15%', delay: $delay
			});
		}
	}

	function facebookShare() {

		$.ajaxSetup({ cache: true });
		$.getScript('//connect.facebook.net/en_US/sdk.js', function () {
			// console.log('facebook loaded');
			// shareFacebook();
			// shareFacebook();
		});
		// setTimeout(function(){
		// 	shareTwitter();
		// }, 3000);
	}

	function shareTwitter() {
		$('#twitter-share').attr('href', "https://twitter.com/share?text=" + encodeURI(getTwitterText() + " Think you can do better? Play PAYBACK") + "&url=https://" + window.location.host);
	}

	function getTwitterText() {
		var text = '';
		switch (getEndOption()) {
			case 'unhappy':
			return currentLanguage.length == 0 ? 'I had to leave college for “personal reasons.”' : 'Tuve que dejar la universidad por “motivos personales”.';
				break;
			case 'noconnections':
				return currentLanguage.length == 0 ? "I just graduated but I can’t find a job." : 'Acabo de graduarme pero no encuentro trabajo.';
				break;
			case 'nofocus':
			return currentLanguage.length == 0 ? "I didn’t keep up my GPA and lost my financial aid." : "No mantuve el promedio de calificaciones y me quitaron mi ayuda financiera.";
				break;
			case 'grad':
			return currentLanguage.length == 0 ? "I’m headed to grad school. And still racking up debt." : "Me voy a una universidad de posgrado. Y sigo acumulando deudas.";
				break;
			case 'happy':
			return currentLanguage.length == 0 ? "Graduated and landed my dream job, all without a student loan nightmare #iwin" : "Me gradué y conseguí el trabajo de mis sueños, todo sin la pesadilla de préstamos universitarios #yogano";
				break;
			case 'debt':
			return currentLanguage.length == 0 ? 'I wish I hadn’t taken out so many student loans.' : 'Ojalá no hubiera solicitado tantos préstamos universitarios.';
				break;
		}
		return text;
	}

	function getEndText() {

		if (meterFocus <= 0) {
			return currentLanguage.length == 0 ? "I didn’t keep up my GPA and lost my financial aid." : "No mantuve el promedio de calificaciones y me quitaron mi ayuda financiera.";
		}
		if (meterHappiness <= 0) {
			return currentLanguage.length == 0 ? 'I had to leave college for “personal reasons.”' : 'Tuve que dejar la universidad por “motivos personales”.';
		}

		if (meterConnections <= 250) {
			return currentLanguage.length == 0 ? "I just graduated but I can’t find a job." : 'Acabo de graduarme pero no encuentro trabajo.';
		}

		if (gradSchool) {
			return currentLanguage.length == 0 ? "I’m headed to grad school. And still racking up debt." : "Me voy a una universidad de posgrado. Y sigo acumulando deudas.";
		}

		if (selectedMajor &&  selectedMajor.meanSalary >= meterLoans) {
			return currentLanguage.length == 0 ? "Graduated and landed my dream job, all without a student loan nightmare #iwin" : "Me gradué y conseguí el trabajo de mis sueños, todo sin la pesadilla de préstamos universitarios #yogano";
		}

		// if(selectedMajor.meanSalary < meterLoans) {
		return currentLanguage.length == 0 ? 'I wish I hadn’t taken out so many student loans.' : 'Ojalá no hubiera solicitado tantos préstamos universitarios.';

	}

	function getEndOption() {

		if (meterFocus <= 0) {
			return 'nofocus';
		}
		
		if (meterHappiness <= 0) {
			return 'unhappy';
		}

		if (meterConnections <= 250) {
			return 'noconnections';
		}

		if (gradSchool) {
			return 'grad';
		}

		if (selectedMajor &&  selectedMajor.meanSalary >= meterLoans) {
			return 'happy';
		}

		// if(selectedMajor.meanSalary < meterLoans) {
		return 'debt';
		// }
	}

	function shareFacebook() {
		if (!FB) {
			// alert('Can\'t connect to facebook right now');
			return;
		}
		FB.getLoginStatus();
		FB.init({
			appId: FACEBOOK_APP_ID ? FACEBOOK_APP_ID : 1899032660334865, //1538111916511824,
			version: 'v2.11' // or v2.1, v2.2, v2.3, ...
		});
		if(gettingDownloadUrl && !downloadUrl) {
			return;
		} 

		var isOverall = true,
			salary = selectedMajor ? selectedMajor.meanSalary : 1;
		try {
			isOverall = $('.tabBtn.selected')[0].innerText === 'OVERALL';
		} catch (e) {

		}
		if (!downloadUrl) {
			getEndScreenShare(getEndOption(), meterLoans, isOverall, salary)
				.then(function (url) {
					downloadUrl = url;
					// Dynamically gather and set the FB share data. 
					var FBDesc = getEndText();
					var FBTitle = 'Play Payback';
					var FBLink = 'https://' + window.location.host + '/' + getEndOption();
					var FBPic = url;

					// Open FB share popup
					FB.ui({
						method: 'share_open_graph',
						action_type: 'og.shares',
						action_properties: JSON.stringify({
							object: {
								'og:url': FBLink,
								'og:title': FBTitle,
								'og:description': FBDesc,
								'og:image': FBPic
							}
						})
					},
						function (response) {
							// Action after response
						})
					// FB.ui({
					// 	method: 'feed',
					// 	redirect_uri: 'https://' + window.location.host,
					// 	link: 'https://' + window.location.host + '/' + getEndOption(),
					// 	source: url,
					// 	picture: url
					// }, function (response) {
					// 	console.log(response);
					// });

					// FB.ui({
					// 	method: 'share',
					// 	href: 'https://' + window.location.host + '/' + getEndOption() + '?img=' + url
					// }, function (response) {
					// 	console.log(response);
					// });
					// console.log('shared with custom image');
				})
				.catch(function (err) {
					console.log(err);
					FB.ui({
						method: 'share',
						href: 'https://' + window.location.host + '/' + getEndOption(),
					}, function (response) {
						// console.log(response);
					});
					// console.log('shared without custom image');
				})
		} else {
			var FBDesc = getEndText();
			var FBTitle = 'Play Payback';
			var FBLink = 'https://' + window.location.host + '/' + getEndOption();
			var FBPic = downloadUrl;

			// Open FB share popup
			FB.ui({
				method: 'share_open_graph',
				action_type: 'og.shares',
				action_properties: JSON.stringify({
					object: {
						'og:url': FBLink,
						'og:title': FBTitle,
						'og:description': FBDesc,
						'og:image': FBPic
					}
				})
			},
				function (response) {
					// Action after response
				})

			// FB.ui({
			// 	method: 'share',
			// 	href: 'https://' + window.location.host + '/' + getEndOption() + '?img=' + url,
			// 	picture: downloadUrl,
			// }, function (response) {
			// 	console.log(response);
			// });
		}

		// FB.ui({
		// method: 'share',
		// href: 'https://' + window.location.host + '/' + getEndOption(),
		// }, function(response){
		// 	console.log(response);
		// });

	}

	function openNewTab() {
		var newTabWindow = window.open();
		return newTabWindow;
	}

	function doBounce(element, times, distance, speed) {
		for(var i = 0; i < times; i++) {
			element.animate({marginTop: '-='+distance}, speed)
				.animate({marginTop: '+='+distance}, speed);
		}        
	}

	function updateTabLocation(tabLocation, tab) {
		// console.log(tabLocation);
		// console.log(tab);
		if(!tabLocation){
		  tab.close();
		}
		if(!tab) {
			$('.share-icon.download').attr('href', downloadUrl);
			doBounce($('.share-icon.download'), 3, '10px', 300);
		} else {
			tab.location.href = tabLocation;
		}
   }

	function downloadCertificate(elm) {
		var isOverall = true,
			salary = selectedMajor ? selectedMajor.meanSalary : 1;
		try {
			isOverall = $('.tabBtn.selected')[0].innerText === 'OVERALL';
		} catch (e) {

		}
		if(gettingDownloadUrl && !downloadUrl) {
			return;
		} 
		if (!downloadUrl) {
			getEndScreenShare(getEndOption(), meterLoans, isOverall, salary)
				.then(function (url) {
					// console.log('got url');
					downloadUrl = url;
					newTab = openNewTab();
					// console.log('got url' + downloadUrl);
					$('#off-screen-link').attr('href', url);
					// console.log('added attr');
					setTimeout(function () {
						updateTabLocation(downloadUrl, newTab);
						// document.getElementById('off-screen-link').click();
						// console.log('clicked');
					}, 50);
					// download(encodeURIComponent(url), 'myPayback.png', 'image/png');
					// //needed for coded auto download
					// setTimeout(function(){
					// 	downloadURI(url);
					// }, 100);
					// downloadURI(url, 'MyPaybackCertificate.png');
				})
				.catch(function (err) {
					console.log(err);
				})
		} else {
			newTab = openNewTab();
			// console.log('inside downloadUrl');
			$('#off-screen-link').attr('href', downloadUrl);
			// console.log('added attr');
			setTimeout(function () {
				updateTabLocation(downloadUrl, newTab);
				// document.getElementById('off-screen-link').click();
				// console.log('clicked');
			}, 50);
			// download(encodeURIComponent(url), 'myPayback.png', 'image/png');
			// setTimeout(function(){
			// 	downloadURI(url);
			// }, 100);
			// downloadURI(downloadUrl, 'MyPaybackCertificate.png');
		}

	}

	function downloadURI(uri, name) {
		var link = document.createElement("a");
		link.download = name;
		link.target = '_blank';
		link.href = uri;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		link.remove();
	}


	// Source: http://pixelscommander.com/en/javascript/javascript-file-download-ignore-content-type/
	window.downloadFile = function (sUrl) {

		//iOS devices do not support downloading. We have to inform user about this.
		if (/(iP)/g.test(navigator.userAgent)) {
			//alert('Your device does not support files downloading. Please try again in desktop browser.');
			window.open(sUrl, '_blank');
			return false;
		}

		//If in Chrome or Safari - download via virtual link click
		if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
			//Creating new link node.
			var link = document.createElement('a');
			link.href = sUrl;
			link.setAttribute('target', '_blank');

			if (link.download !== undefined) {
				//Set HTML5 download attribute. This will prevent file from opening if supported.
				var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
				link.download = fileName;
			}

			//Dispatching click event.
			if (document.createEvent) {
				var e = document.createEvent('MouseEvents');
				e.initEvent('click', true, true);
				link.dispatchEvent(e);
				return true;
			}
		}

		// Force file download (whether supported by server).
		if (sUrl.indexOf('?') === -1) {
			sUrl += '?download';
		}

		window.open(sUrl, '_blank');
		return true;
	}

	window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

	function turnBtnOff() {
		//console.log('turn buttons off');
		//if content is not loaded keep buttons off
		$('.opt').addClass('disabled');
		optOn = false;
	}

	function turnBtnOn() {
		//console.log('optOn: ' + optOn);
		if (!optOn) {
			//check if we are passed college options
			// console.log('turn buttons on');
			//once all content is loaded turn buttons on
			$('.opt').removeClass('disabled');
			optOn = true;
		}
	}

	function addCurrent($direction, $panel) {
		handleSectionClassesAfterPanelMoved($panel);
		removeAllExceptCurrent();
		drawLinesAfterScreenHasAnimated($panel, $direction);
	}

	function handleSectionClassesAfterPanelMoved($panel) {
		var $id = $panel.replace('panel-', ''),
			$background = 'background-' + $id;
		$('.previous').removeClass('previous');
		$('.current').removeClass('current').addClass('previous');
		$('.current-background').removeClass('current-background');
		//add current to panel in viewport
		$('section#' + $panel).addClass('current');
		$('#' + $background).addClass('current-background');
		//remove active class from intro elements
		if ($('.active').length > 0) {
			$('.active').removeClass('active');
		}
	}

	//ANIMATING TRANSITIONAL LINES
	function drawLinesAfterScreenHasAnimated(panel, direction) {

		//figure out template
		globalDirection = direction;


		var template = $('#' + panel).find('div:first-child').attr('data-template');

		var elm;
		switch (template) {
			case 'message':
				drawLineToMsg(direction, panel);
				break;
			case 'whack-a-mole':
				drawLineToMsg(direction, panel);
				break;
			case 'challenge':
				elm = $('.optHolder .contentWrap .questionWrapper');
				drawLineToChallenge(direction, elm);
				break;
			case 'endFrame':
				elm = $('#endFrame .questionWrap');
				drawLineToChallenge(direction, elm);
				break;
			case 'endMeters':
				elm = $('#' + panel + ' #endMeters .textWrapper');
				drawLineToChallenge('down', elm);
				break;
			case 'title':
				$('#' + panel).addClass('title-panel');
				elm = $('#title-template .title-img');
				drawMiniGameLines(elm, 125, 50, 75, '.current');
				break;
			case 'shopping':
				elm = $('#optShopping .shopping-items');
				drawMiniGameLines(elm, 90, 50, 110, '.current');
				break;
			case 'slider':
				elm = $('#rangeholder');
				drawMiniGameLines(elm, 200, 120, 130, '.current');
				break;
			case 'register':
				elm = $('#optRegister .register-timer');
				drawMiniGameLines(elm, 175, 200, 100, '.current');
				break;
			case 'whackamole':
				elm = $('#optWhackAMole .whack-a-mole-items');
				drawMiniGameLines(elm, 200, 80, 170, '.current');
				break;
			case 'majors':
				elm = $('#optMajors .majors-slick');
				drawMiniGameLines(elm, 250, 75, 50, '.current');
				break;
			case 'study':
				elm = $('.psychology-container .study-slick');
				drawMiniGameLines(elm, 80, 0, 20, '.current');
				break;
			default:
				break;
		}

		////animate svg meter icons on fail screens
		var view = $('#' + panel).attr('data-view');
		if (view == "end" || view == "challenge") {
			if ($('.meterIcon').hasClass('happyIcon')) {
				//animate mouth
				TweenMax.to("#mouth", 2, { morphSVG: "M29.1,69 c0,0,3.7-13.4,20.9-13.4S71,69,71,69" });
			} else if ($('.meterIcon').hasClass('focusIcon')) {
				//animate arrow
				TweenMax.to("#arrow", 1.5, { rotation: -65, svgOrigin: "405 325", transformOrigin: "40% 50%", ease: Power1.easeInOut });
			} else if ($('.meterIcon').hasClass('connectionsIcon')) {
				//animate person
				var anim = new TimelineMax({});
				anim
					.to("#single", .75, { rotation: 15, transformOrigin: "50% 50%", ease: Power1.easeInOut })
					.to("#single", 1, { rotation: -20, transformOrigin: "50% 50%", ease: Power1.easeInOut })
					.to("#single", .85, { rotation: 75, svgOrigin: "310 72", transformOrigin: "50% 50%", ease: Power3.easeIn });
			}
		}
	}

	function removeAllExceptCurrent() {
		//console.log('remove all except current');
		//remove all old sections
		// || $(this).hasClass('previous')
		$('section').each(function () {
			if ($(this).hasClass('current')) {

			} else {
				//if section is not current
				$(this).remove();
			}
		});
		$('.background-panel').each(function () {
			if (!$(this).hasClass('current-background')) {
				$(this).remove();
			}
		});
	}

	// function currentDisplay() {
	// 	//running into ASYNC issue
	// 	//TODO fix this correctly
	// 	if (!selectedPathData || !challengeData) {
	// 		setTimeout(function () {
	// 			currentDisplay();
	// 		}, 25);
	// 		return;
	// 	}
	// 	//console.log('current display');
	// 	//determine what screen is currently displaying for user
	// 	var $display = $('.current').attr('data-view');
	// 	currentView = $display;
	// 	// console.log('current view: ' + currentView);

	// 	//check if major question
	// 	// if ($('.current').hasClass('majorQuestion')) {
	// 	// 	loadChallengeAfterMajor();
	// 	// };

	// 	if (currentSectionIndex >= selectedPathData.selectedPath.SectionSelectedPaths.length) {
	// 		return;
	// 	}

	// 	var //$section = selectedPathData ? selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section.label : sectionChallengesMap[].label,
	// 		$sectionLabel = selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section.label,
	// 		$sectionLabelUrl = $sectionLabel.replace(/ /g, "").toLowerCase();

	// 	//for google anayltics
	// 	switch (currentView) {
	// 		case 'challenge':
	// 			var $challenge = challengeData[currentChallengesIndex],
	// 				$challengeId = $challenge.challengeId,
	// 				$challengeLabel = $challenge.Challenge.label,
	// 				$challengeText = $.trim($challengeLabel.replace(/(<([^>]+)>)/ig, ""));

	// 			ga('send', 'pageview', '/game/' + $sectionLabelUrl + '/challenge/' + $challengeId);
	// 			ga('send', 'event', $sectionLabel, 'Challenge', $challengeText);
	// 			break;
	// 		case 'message':
	// 			break;
	// 		case 'title':
	// 			ga('send', 'pageview', '/game/' + $sectionLabelUrl + '/start');
	// 			ga('send', 'event', $sectionLabel, 'Path', 'Start');
	// 			break;
	// 	}
	// }

	function removeShape($currentShape) {
		$('#' + $currentShape).removeClass('show');
	}

	// function createNewSection() {
	// 	if (!priorCurrentSection || priorCurrentSection != currentSection) {
	// 		priorCurrentSection = currentSection;
	// 	} else if (priorCurrentSection === currentSection) {
	// 		loadNextSection();
	// 		return;
	// 	}

	// 	if(selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section && selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section.SectionChallenges && selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section.SectionChallenges.length > 0 && loadedSections >= selectedPathData.selectedPath.SectionSelectedPaths.length) {
	// 			currentChallengesData = selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section.SectionChallenges;
	// 			currentChallengesIndex = 0;
	// 			currentChallenge = currentChallengesData[currentChallengesIndex];
	// 			currentSection = selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section.id;
	// 			challengeData = selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section.SectionChallenges;
	// 			loadNextSection();
	// 			return;
	// 	}

	// 	if(loadedSections === 0) {
	// 		selectedPathData._usedChallenges = [];
	// 	}

	// 	// selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex]
	// 	//console.log('create new section: ' + currentSection);
	// 	//check what type of panel to display next
	// 	//call to get all challenges within current section
	// 	getSectionChallengesBySectionId(currentSection)
	// 		.then(function (data) {
	// 			//this lets us always work of selected path index
	// 			selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section.SectionChallenges = data.section.SectionChallenges;
	// 			selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section._randomChallenges = data.section.SectionRandomChallenges;
	// 			currentChallengesData = selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section.SectionChallenges;
	// 			currentChallengesIndex = 0;
	// 			currentChallenge = currentChallengesData[currentChallengesIndex];
	// 			currentSection = data.section.id;
	// 			challengeData = data.section.SectionChallenges;
	// 			loadedSections++;
	// 			// loadRandomChallengeForSection(currentSection, currentSectionIndex);
	// 			loadAllSectionsAndChallengesBySectionId(currentSection);
	// 			if(window.location.hash.indexOf('#debug') >= 0) {
	// 				// loadAllSectionsAndChallengesBySectionId(currentSection);
	// 			} else {
	// 				loadNextSection();
	// 			}
	// 		})
	// 		.catch(function (err) {
	// 			console.log(err);
	// 		});
	// }

	function loadRandomChallengeForSection(id, index) {
		getRandomChallengesInSection(id)
			.then(function (data) {
				// console.log(selectedPathData.selectedPath.SectionSelectedPaths[index]);
				selectedPathData.selectedPath.SectionSelectedPaths[index].Section._randomChallenges = data.section.SectionChallenges;
			})
			.catch(function (err) {
				console.log(err);
			})
	}

	function debugMode() {
		if (loadedSections == selectedPathData.selectedPath.SectionSelectedPaths.length - 1) {
			currentSectionIndex = window.location.hash.split('-')[1];
			currentChallengesIndex = window.location.hash.split('-')[2] ? parseInt(window.location.hash.split('-')[2]) : 0;
			var section = selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex];
			challengeData = section.Section.SectionChallenges;
			loadNextSection();
			// loadAllSectionsAndChallengesBySectionId(section.Section.id);
		}
	}

	function loadAllSectionsAndChallengesBySectionId(exceptThisId) {
		for (var i = 0, len = selectedPathData.selectedPath.SectionSelectedPaths.length; i < len; i++) {
			// if(exceptThisId === selectedPathData.selectedPath.SectionSelectedPaths[i].sectionId) {
			// 	continue;
			// }
			getSectionChallengesBySectionId(selectedPathData.selectedPath.SectionSelectedPaths[i].sectionId)
				.then(function (data) {
					//this lets us always work of selected path index
					for (var i = 0, len = selectedPathData.selectedPath.SectionSelectedPaths.length; i < len; i++) {
						if (selectedPathData.selectedPath.SectionSelectedPaths[i].Section.id === data.section.id) {
							selectedPathData.selectedPath.SectionSelectedPaths[i].Section.SectionChallenges = data.section.SectionChallenges;
							selectedPathData.selectedPath.SectionSelectedPaths[i].Section._randomChallenges = data.section.SectionRandomChallenges;
							// loadRandomChallengeForSection(data.section.id, i);
							break;
						}
					}
					loadedSections++;
					if (window.location.hash.indexOf('#debug') >= 0) {
						debugMode();
					}
					if (loadedSections == selectedPathData.selectedPath.SectionSelectedPaths.length) {
						allSectionsLoaded = true;
					}
				})
				.catch(function (err) {
					console.log(err);
				});
		}
	}

	function getRandomChallenge() {
		try {
			if (selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section._randomChallenges.length === 0) {
				return false;
			}
			var randomInt = randomIntFromInterval(0, selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section._randomChallenges.length - 1),
				challenge = selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section._randomChallenges[randomInt];
			selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section._randomChallenges.splice(randomInt, 1);
			if (selectedPathData._usedChallenges.indexOf(challenge.challengeId) >= 0) {
				return getRandomChallenge();
			}
			//selectedPathData._usedChallenges.push(challenge.challengeId);
			return challenge;
		} catch (e) {
			// console.log(e);
			return false;
		}
	}

	function loadAndAnimateToNextSection(direction, delay, onComplete) {
		if ((meterFocus <= 0 || meterHappiness <= 0) && currentView == 'message') {
			displayMeterEnd(addNewPanel());
			return;
		}
		var panel = 'panel-' + loadNextSection(),
			gameBroke = false;

		// if(currentView == 'message') {
		// 	//testing for end download
		// 	loadGradEndTemplate(2);
		// 	animatePanel(panel, direction, delay, onComplete);
		// 	return;
		// }

		try {
			if ($('#' + panel)[0].innerText.trim().length == 0) {
				gameBroke = true;
				console.error('Empty screen breaks game in year ' + selectedPathData.selectedPath.label + ' in section index ' + currentSectionIndex + ' and challenge index ' + currentChallengesIndex);
				// console.log('Challenge data');
				// console.log(JSON.stringify(challengeData));
				// console.log('Section data');
				// console.log(JSON.stringify(selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex]));
			}
		} catch (e) {
			// console.log(e);
		}

		//TODO possible fix for blank screens so game doesn't break. could get into weird state
		try {
			if (gameBroke && challengeData[currentChallengesIndex].Challenge.ChallengeAnswerType.type != 'Major') {
				submitLog(JSON.stringify(createLogObject()), 'Game had blank screen. Auto sent');
				// handleIndexIncreases();
				// loadAndAnimateToNextSection(direction, delay, onComplete);
				// return;
			}
		} catch (e) {

		}

		animatePanel(panel, direction, delay, onComplete);
	}

	function createLogObject() {
		return {
			schoolYear: selectedPathData.selectedPath.label,
			sectionIndex: currentSectionIndex,
			challengeIndex: currentChallengesIndex
			// ,
			// currentYear: selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex]
		}
	}

	function loadNextSection() {
		//create new section
		var panel = addNewPanel();

		switch (currentView) {
			case 'firstQuestion':
				var section = selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex];
				challengeData = section ? section.Section.SectionChallenges : null;
				displayChallenge(challengeData[currentChallengesIndex], {}, panel);
				break;
			case 'challenge':
				loadNextAfterChallenge(panel);
				break;
			case 'message':
				loadTitleOrChallenge(panel);
				break;
			case 'title':
				var section = selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex];
				challengeData = section ? section.Section.SectionChallenges : null;
				displayChallenge(challengeData[currentChallengesIndex], selectedOutcome, panel);
				break;
			case 'displayGraduationEnd':
				displayFinishEnd(panel);
				break;
			// case 'endTitle':
			// 	loadTitleOrEndScreen(panel);
			// break;
		}

		turnBtnOn();
		return panel;
	}

	function loadTitleOrChallenge(panel) {
		if (currentChallengesIndex === 0) {
			loadTitleOrGraduationScreen(panel);
			return;
		}

		displayChallenge(challengeData[currentChallengesIndex], selectedOutcome, panel);
	}

	function loadNextAfterChallenge(panel) {
		if (selectedOutcome.Outcome['message' + currentLanguage]) {
			displayMessage(selectedOutcome, selectedOutcome.Outcome['message' + currentLanguage], panel);
			return;
		}

		loadTitleOrChallenge(panel);
	}

	function loadTitleOrGraduationScreen(panel) {
		if (currentSectionIndex > sectionCount) {
			displayGraduationEnd(panel);
		} else {
			//console.log('more sections go to title');
			//if more sections
			displayTitle(currentSectionIndex, panel);
		}
	}

	function insertRandomChallengesForAllSections() {
		var tmpUsedChallenges = [];

		for (var i = currentSectionIndex, len = selectedPathData.selectedPath.SectionSelectedPaths.length; i < len; i++) {
			if (!selectedPathData.selectedPath.SectionSelectedPaths[i].Section._randomChallenges || selectedPathData.selectedPath.SectionSelectedPaths[i].Section._randomChallenges.length === 0) {
				continue;
			}
			selectedPathData._usedChallenges = selectedPathData._usedChallenges ? selectedPathData._usedChallenges : [];
			insertRandomChallengesForSection(selectedPathData.selectedPath.SectionSelectedPaths[i].Section, i === currentSectionIndex ? currentChallengesIndex : 0, selectedPathData._usedChallenges, tmpUsedChallenges);
			if (i === currentSectionIndex) {
				challengeData = selectedPathData.selectedPath.SectionSelectedPaths[i].Section.SectionChallenges;
			}
		}
	}

	//TODO should have a check of all prior non randoms that will guarentee that random won't be available
	function insertRandomChallengesForSection(section, i, usedChallenges, tmpUsedChallenges) {
		var obj = [],
			removeRandomChallenges = [],
			j,
			arrLen;
		for (j = i, arrLen = section.SectionChallenges.length; j < arrLen; j++) {
			if (section.SectionChallenges[j].random) {
				var challenge = getRandomChallengeNotCurrentlyUsed(section._randomChallenges, usedChallenges, tmpUsedChallenges);
				challenge.random = 1;
				//we splice if no random challenges left
				if (!challenge) {
					removeRandomChallenges.push(j);
				} else {
					tmpUsedChallenges.push(challenge.challengeId);
					section.SectionChallenges[j] = challenge;
				}
			}
		}
		if (removeRandomChallenges.length > 0) {
			for (j = removeRandomChallenges.length; j >= 0; j--) {
				section.SectionChallenges.splice(removeRandomChallenges[j], 1);
			}
		}
	}

	function getRandomChallengeNotCurrentlyUsed(randomChallenges, usedChallenges, tmpUsedChallenges) {
		var availableRandomChallengesNotInUse = [],
			lenOfAvailableRandomChallengesNotInUse = 0;
		for (var k = 0, len = randomChallenges.length; k < len; k++) {
			if (usedChallenges.indexOf(randomChallenges[k].challengeId) < 0 && tmpUsedChallenges.indexOf(randomChallenges[k].challengeId) < 0) {
				availableRandomChallengesNotInUse.push(k);
			}
		}
		lenOfAvailableRandomChallengesNotInUse = availableRandomChallengesNotInUse.length;
		if (lenOfAvailableRandomChallengesNotInUse === 0) {
			return false;
		} else if (lenOfAvailableRandomChallengesNotInUse === 1) {
			return randomChallenges[availableRandomChallengesNotInUse[0]];
		} else {
			return randomChallenges[availableRandomChallengesNotInUse[randomIntFromInterval(0, lenOfAvailableRandomChallengesNotInUse - 1)]];
		}

	}


	function handleArrayOfOutcomeChallenges(arrayOfOutcomesChallenges) {
		return new Promise(function (resolve, reject) {
			turnBtnOff();
			if (!arrayOfOutcomesChallenges || arrayOfOutcomesChallenges.length == 0) {
				setTimeout(function () {
					resolve();
				}, 1);
				return;
			}
			getArrayOfChallengesWithOutcomes(arrayOfOutcomesChallenges)
				.then(function (challenges) {
					var challengeSectionYear,
						selectedType,
						randomIndexForChallenge;

					for (var i = 0, len = challenges.length; i < len; i++) {
						try {
							selectedType = outcomeChallengeTypesMap[challenges[i].type].replace(/\s/g, '').toLowerCase();
							switch (selectedType) {
								case 'currentyear':
								case 'nextquestion':
									challengeSectionYear = currentSectionIndex;
									break;
								case 'nextyear':
									challengeSectionYear = currentSectionIndex + 1;
									break;
								case 'everyyear':
									if (challenges[i].random) {
										for (var j = currentSectionIndex + 1, sectionLength = selectedPathData.selectedPath.SectionSelectedPaths.length; j < sectionLength; j++) {
											selectedPathData.selectedPath.SectionSelectedPaths[j].Section._randomChallenges.push(challenges[i]);
										}
										break;
									}
								case 'randomyear':
									challengeSectionYear = randomIntFromInterval(currentSectionIndex, selectedPathData.selectedPath.SectionSelectedPaths.length - 1);
									break;
								case 'highschoolsenior':
									challengeSectionYear = 0;
									break;
								case 'collegefreshman':
									challengeSectionYear = 1;
									break;
								case 'collegesophmore':
									challengeSectionYear = 2;
									break;
								case 'collegejunior':
									challengeSectionYear = 3;
									break;
								case 'collegesenior':
									challengeSectionYear = 4;
									break;
								default:
									challengeSectionYear = currentSectionIndex;
									break;
							}
						} catch (e) {
							challengeSectionYear = currentSectionIndex;
						}
						if (challengeSectionYear < currentSectionIndex || challengeSectionYear >= selectedPathData.selectedPath.SectionSelectedPaths.length) {
							challengeSectionYear = currentSectionIndex;
						}
						try {
							if (challenges[i].random) {
								selectedPathData.selectedPath.SectionSelectedPaths[challengeSectionYear].Section._randomChallenges.push(challenges[i]);
							} else {
								if (selectedType && selectedType != 'nextquestion') {
									if (challengeSectionYear == currentSectionIndex) {
										randomIndexForChallenge = randomIntFromInterval(currentChallengesIndex, selectedPathData.selectedPath.SectionSelectedPaths[challengeSectionYear].Section.SectionChallenges.length - 1);
									} else {
										randomIndexForChallenge = randomIntFromInterval(0, selectedPathData.selectedPath.SectionSelectedPaths[challengeSectionYear].Section.SectionChallenges.length - 1);
									}
									selectedPathData.selectedPath.SectionSelectedPaths[challengeSectionYear].Section.SectionChallenges.splice(randomIndexForChallenge + 1, 0, challenges[i]);
								} else {
									selectedPathData.selectedPath.SectionSelectedPaths[challengeSectionYear].Section.SectionChallenges.splice(currentChallengesIndex + 1, 0, challenges[i]);
								}
							}
						} catch (e) {
							// console.log(e);
						}
					}
					challengeData = selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section.SectionChallenges;
					// challengeData.splice.apply(challengeData, [currentChallengesIndex, 0].concat(challenges));
					//we loaded selected outcome challenges. Lets null it out
					selectedOutcomeAddedChallengeFlag = true;
					selectedOutcome.OutcomeChallenges = [];
					// alert('need to load this challenge then animate');
					turnBtnOn();
					resolve();
				})
				.catch(function (err) {
					selectedOutcomeAddedChallengeFlag = true;
					selectedOutcome.OutcomeChallenges = [];
					turnBtnOn();
					reject();
				})
		})
	}

	//used on the language click. handles the language selected then updating the html
	function clickLanguage(e, language) {
		if (!languageOn) {
			currentLanguage = '';
			return;
		}
		if (language === null) {
			return;
		}
		var languageSpans = $('#language-selector span');
		for (var i = 0, len = languageSpans.length; i < len; i++) {
			languageSpans[i].classList.remove('selected');
		}
		e.classList.add('selected');
		currentLanguage = language.length > 0 ? '_' + language : language;
		updateLanguage();
		// loadFooter();
		// //hide the tool tips from the load footer
		// setTimeout(function(){
		// 	hideToolTips();
		// }, 4500);

		if ($(window).width() > 813) {
			loadFooter();
			//hide the tool tips from the load footer
			setTimeout(function(){
				hideToolTips();
			}, 4500);
		} else {
			loadFooter();
			$('.tooltip').css('display', 'none');
			hideToolTips();
		}
	}

	function clickOutcome(direction, index, e, elm) {
		e.stopPropagation();
		if (elm.classList.contains('disabled')) {
			return;
		}
		//add class disabled so we don't let them keep clicking
		turnBtnOff();

		try {
			selectedOutcome = { Outcome: new Object(challengeData[currentChallengesIndex].Challenge.ChallengeOutcomes[index].Outcome) };
			checkForSelectedOutcomeRecurring();
		} catch (e) {
			// console.log(e);
			unableToGetOutcome = true;
		}

		var selectedValue = challengeData[currentChallengesIndex].Challenge.ChallengeOutcomes[index];


		//we push onto the index of challenges
		if (!selectedPathData._usedChallenges) {
			selectedPathData._usedChallenges = [];
		}
		selectedPathData._usedChallenges.push(challengeData[currentChallengesIndex].Challenge.id);

		if (selectedOutcome.Outcome.OutcomeChallenges.length > 0) {
			handleArrayOfOutcomeChallenges(selectedOutcome.Outcome.OutcomeChallenges)
				.then(function () {
					loadNextChallenge(challengeData[currentChallengesIndex].Challenge, selectedOutcome, direction, elm);
				})
				.catch(function () {
					loadNextChallenge(challengeData[currentChallengesIndex].Challenge, selectedOutcome, direction, elm);
				})
		} else {
			loadNextChallenge(challengeData[currentChallengesIndex].Challenge, selectedOutcome, direction, elm);
		}
	}


	function loadNextChallenge(challenge, outcomeSelected, direction, elm) {
		endOfChallengeOutcomeSelection(challenge, outcomeSelected);

		drawLineFromSelectedOpt(direction, elm);

		animateOutcomes(outcomeSelected)
			.then(function () {

				loadAndAnimateToNextSection(direction, 0, addCurrent);
			})
			.catch(function (err) {
				// console.log(err);
				// console.log('challenge-index ' + currentChallengesIndex);
				// console.log('section-index ' + currentSectionIndex);
				// console.log('animated outcomes broke but we are going to continue.');
				// console.log(selectedOutcome);
				//drawLineFromSelectedOpt(direction, elm);
				loadAndAnimateToNextSection(direction, 0, addCurrent);
			});
	}

	//beth
	//draw line from challenge answer click to left, right, or down
	function drawLineFromSelectedOpt(direction, elm) {

		if ($('.current').find('div:nth-child(4)').attr('data-template') === 'whackamole' || $('.current').find('div:nth-child(4)').attr('data-template') === 'register' || $('.current').find('div:nth-child(4)').attr('data-template') === 'majors') {
			//console.log('whackamole|register|majors dont draw line here');
			return;
		}

		var svgAnim, viewboxW, viewboxH, pathW, pathH, pathX, pathY, startingY, startingX, offset, time, nudge;

		//if for some reason we don't get reference to elm, just don't draw line here, we'll get it going again on the next panel
		if (!elm || elm === undefined) {
			// console.log("elm was undefined - don't draw line");
			return;
		}

		//check for the 4 option template
		if ($(elm).parent().hasClass('first')) {
			// console.log('first');
			drawLinesForOptFour('first', elm);
			return;
		} else if ($(elm).parent().hasClass('last')) {
			// console.log('last');
			drawLinesForOptFour('last', elm);
			return;
		}

		offset = $(elm).offset();

		if (!offset) {
			// console.log("offset was undefined - don't draw line");
			return;
		}

		switch (direction) {
			case 'down':
				viewboxW = 3;
				viewboxH = $(window).height() - offset.top;
				pathX = 1.5;
				pathY = 0;
				pathW = 1.5;
				pathH = viewboxH;
				startingX = offset.left + ($(elm).width() / 2) + 10;
				startingY = offset.top;
				time = viewboxH / 360;
				nudge = '-2px';
				break;
			case 'right':
				viewboxW = $(window).width() - offset.left;
				viewboxH = 3;
				pathX = 0;
				pathY = 1.5;
				pathW = viewboxW;
				pathH = 1.5;
				startingX = offset.left;
				startingY = offset.top + ($(elm).height() / 2) + 5;
				time = viewboxW / 400;
				nudge = '0px';
				break;
			case 'left':
				viewboxW = offset.left;
				viewboxH = 3;
				pathX = 0;
				pathY = 1.5;
				pathW = viewboxW;
				pathH = 1.5;
				startingX = 0;
				startingY = offset.top + ($(elm).height() / 2) + 8;
				time = viewboxW / 400;
				nudge = '0px';
				break;
		}

		svgAnim = '<div class="svg-' + direction + '-anim"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + viewboxW + ' ' + viewboxH + '" preserveAspectRatio="xMidYMin slice"><line class="path" x1="' + pathX + '" y1="' + pathY + '" x2="' + pathW + '" y2="' + pathH + '"/><line class="line" x1="' + pathX + '" y1="' + pathY + '" x2="' + pathW + '" y2="' + pathH + '"/></svg></div>';

		$('.current .optHolder').append('<div class="svg-options-anim"></div>');
		$('.current .optHolder .svg-options-anim').append(svgAnim).css({ top: startingY, left: startingX, width: viewboxW, height: viewboxH, marginLeft: nudge });
		if (direction == 'left') {
			$('.svg-options-anim').css('transform-origin', 'center center');
			$('.svg-options-anim').css('transform', 'rotate(180deg)');
		}

		TweenMax.to('.current .optDebt', .15, { opacity: 0 });
		TweenMax.to('.current .svg-' + direction + '-anim svg line.path', time, { drawSVG: "0% 100%", ease: Power0.easeNone });

	}

	function drawLinesForOptFour(direction, elm) {

		var offset, elm, points, svgAnim, point1x, point1y, point2y, point3x, point4y, viewboxW, viewboxH, time;

		//if for some reason we don't get reference to elm, just don't draw line here, we'll get it going again on the next panel
		if (!elm || elm === undefined) {
			// console.log("elm was undefined - don't draw line");
			return;
		}

		offset = $(elm).offset();

		if (!offset) {
			// console.log("offset was undefined - don't draw line");
			return;
		}

		point1x = offset.left + ($(elm).width() / 2) + 10;
		point1y = offset.top;
		point2y = offset.top + (($(window).height() - offset.top) / 2);
		point3x = $(window).width() / 2;
		point4y = $(window).height();
		viewboxW = $(window).width();
		viewboxH = $(window).height();
		time = ($(window).height() - offset.top) / 360;

		points = point1x + ',' + point1y + ',';
		points += point1x + ',' + point2y + ',';
		points += point3x + ',' + point2y + ',';
		points += point3x + ',' + point4y;

		svgAnim = '<svg version="1.1" id="minigame-anim" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + viewboxW + ' ' + viewboxH + '" preserveAspectRatio="xMidYMin slice"><polyline id="outline-path" class="path" points=' + points + ' /><polyline id="outline" class="line" points=' + points + ' /></svg>';

		$('.current .optHolder').append('<div class="svg-minigame-anim"></div>');
		$('.current .optHolder .svg-minigame-anim').append(svgAnim);

		TweenMax.to('.current .optHolder .svg-minigame-anim svg polyline.path', time, { drawSVG: "0% 100%", ease: Power0.easeNone });

		$(window).on('resize', function () {
			offset = $(elm).offset();

			point1x = offset.left + ($(elm).width() / 2) + 10;
			point1y = offset.top;
			point2y = offset.top + (($(window).height() - offset.top) / 2);
			point3x = $(window).width() / 2;
			point4y = $(window).height();
			viewboxW = $(window).width();
			viewboxH = $(window).height();
			time = ($(window).height() - offset.top) / 360;

			points = point1x + ',' + point1y + ',';
			points += point1x + ',' + point2y + ',';
			points += point3x + ',' + point2y + ',';
			points += point3x + ',' + point4y;

			svgAnim = '<svg version="1.1" id="minigame-anim" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + viewboxW + ' ' + viewboxH + '" preserveAspectRatio="xMidYMin slice"><polyline id="outline-path" class="path" points=' + points + ' /><polyline id="outline" class="line" points=' + points + ' /></svg>';

			$('.current .optHolder .svg-minigame-anim').html(svgAnim);

			TweenMax.to('.current .optHolder .svg-minigame-anim svg polyline.path', 0, { drawSVG: "0% 100%", ease: Power0.easeNone });
		});
	}


	//draw line from top, right or left to message circle
	function drawLineToMsg(direction, panel) {

		var svgAnim, viewboxW, viewboxH, pathW, pathH, pathX, pathY, startingY, startingX, startingW, offset, elm, time, nudge;

		elm = $('#' + panel).find('.svg-message-anim');

		//if for some reason we don't get reference to elm, just don't draw line here, we'll get it going again on the next panel
		if (!elm || elm === undefined) {
			// console.log("elm was undefined - don't draw line");
			return;
		}

		offset = $(elm).offset();

		if (!offset) {
			// console.log("offset was undefined - don't draw line");
			return;
		}

		switch (direction) {
			case 'down':
				viewboxW = 3;
				viewboxH = offset.top;
				pathX = 1.5;
				pathY = 0;
				pathW = 1.5;
				pathH = offset.top;
				startingX = 0;
				startingY = 0;
				startingW = '100%';
				time = viewboxH / 360;
				nudge = "-2px";
				break;
			case 'left':
				viewboxW = offset.left;
				viewboxH = 3;
				pathX = 0;
				pathY = 1.5;
				pathW = offset.left;
				pathH = 1.5;
				startingX = $(window).width() - offset.left;
				startingY = offset.top + ($(elm).height() / 2) - 33;
				startingW = viewboxW;
				time = viewboxW / 400;
				nudge = "0px";
				break;
			case 'right':
				viewboxW = offset.left;
				viewboxH = 3;
				pathX = 0;
				pathY = 1.5;
				pathW = offset.left;
				pathH = 1.5;
				startingX = 0;
				startingY = offset.top + ($(elm).height() / 2) - 33;
				startingW = viewboxW;
				time = viewboxW / 400;
				nudge = "0px";
				break;
		}

		svgAnim = '<div class="svg-' + direction + '-anim"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + viewboxW + ' ' + viewboxH + '" preserveAspectRatio="xMidYMin slice"><line class="path" x1="' + pathX + '" y1="' + pathY + '" x2="' + pathW + '" y2="' + pathH + '"/><line class="line" x1="' + pathX + '" y1="' + pathY + '" x2="' + pathW + '" y2="' + pathH + '"/></svg></div>';

		$('#' + panel + ' #message-template').append('<div class="svg-options-anim"></div>');

		var thisLine = $('#' + panel + ' #message-template .svg-options-anim');
		var thisCircle = $('#' + panel + ' .svg-message-anim svg');

		$(thisLine).append(svgAnim).css({ top: startingY, left: startingX, width: startingW, height: viewboxH, marginLeft: nudge });

		//rotate circle to entry point of line
		if (direction == 'down') {
			$(thisCircle).css('transform', 'rotate(-90deg)');
		}
		if (direction == 'right') {
			$(thisCircle).css('transform', 'rotate(-175deg)');
		}
		if (direction == 'left') {
			$(thisLine).css('transform-origin', 'center center');
			$(thisLine).css('transform', 'rotate(180deg)');
			$(thisCircle).css('transform', 'rotate(-10deg)');
		}


		TweenMax.to('#' + panel + ' #message-template .svg-options-anim svg line.path', time, {
			drawSVG: "0% 100%", ease: Power0.easeNone, onComplete: function () {
				TweenMax.to('#' + panel + ' .svg-message-anim svg circle.path', .75, { drawSVG: "0% 100%" });
			}
		});

		$(window).on('resize', function () {
			offset = $(elm).offset();

			switch (direction) {
				case 'down':
					viewboxW = 3;
					viewboxH = offset.top;
					pathX = 1.5;
					pathY = 0;
					pathW = 1.5;
					pathH = offset.top;
					startingX = 0;
					startingY = 0;
					startingW = '100%';
					break;
				case 'left':
					viewboxW = offset.left;
					viewboxH = 3;
					pathX = 0;
					pathY = 1.5;
					pathW = offset.left;
					pathH = 1.5;
					startingX = $(window).width() - offset.left;
					startingY = offset.top + ($(elm).height() / 2) - 33;
					startingW = viewboxW;
					break;
				case 'right':
					viewboxW = offset.left;
					viewboxH = 3;
					pathX = 0;
					pathY = 1.5;
					pathW = offset.left;
					pathH = 1.5;
					startingX = 0;
					startingY = offset.top + ($(elm).height() / 2) - 33;
					startingW = viewboxW;
					break;
			}

			svgAnim = '<div class="svg-' + direction + '-anim"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + viewboxW + ' ' + viewboxH + '" preserveAspectRatio="xMidYMin slice"><line class="path" x1="' + pathX + '" y1="' + pathY + '" x2="' + pathW + '" y2="' + pathH + '"/><line class="line" x1="' + pathX + '" y1="' + pathY + '" x2="' + pathW + '" y2="' + pathH + '"/></svg></div>';

			$(thisLine).html(svgAnim).css({ top: startingY, left: startingX, width: startingW, height: viewboxH, marginLeft: nudge });

			TweenMax.to('#' + panel + ' #message-template .svg-options-anim svg line.path', 0, { drawSVG: "0% 100%" });

		});

	}

	//draw line out from bottom of message circle to bottom of panel when message button is clicked
	function drawLineFromMsg(direction, panel) {

		var svgAnim, viewboxW, viewboxH, pathW, pathH, pathX, pathY, startingY, startingX, offset, elm, time, nudge;

		if (panel) {
			panel = '#' + panel;
		} else {
			panel = '.current';
		}

		elm = $(panel + ' .svg-message-anim');

		//if for some reason we don't get reference to elm, just don't draw line here, we'll get it going again on the next panel
		if (!elm || elm === undefined) {
			// console.log("elm was undefined - don't draw line");
			return;
		}

		offset = $(elm).offset();

		if (!offset) {
			// console.log("offset was undefined - don't draw line");
			return;
		}

		//always direction = down
		viewboxW = 3;
		viewboxH = $(window).height() - (offset.top + $(elm).height());
		pathX = 1.5;
		pathY = 0;
		pathW = 1.5;
		pathH = viewboxH;
		startingX = '50%';
		startingY = offset.top + $(elm).height();
		time = viewboxH / 400;
		nudge = "-2px"

		svgAnim = '<div class="svg-' + direction + '-anim"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + viewboxW + ' ' + viewboxH + '" preserveAspectRatio="xMidYMin slice"><line class="path" x1="' + pathX + '" y1="' + pathY + '" x2="' + pathW + '" y2="' + pathH + '"/><line class="line" x1="' + pathX + '" y1="' + pathY + '" x2="' + pathW + '" y2="' + pathH + '"/></svg></div>';

		$(panel + ' #message-template').append('<div class="svg-options-anim-1"></div>');

		$(panel + ' #message-template .svg-options-anim-1').append(svgAnim).css({ top: startingY, left: startingX, width: viewboxW, height: viewboxH, marginLeft: nudge });

		TweenMax.to(panel + ' #message-template .svg-' + direction + '-anim svg line.path', time, { drawSVG: "0% 100%", ease: Power0.easeNone });

	}

	//draw line to top of challenge question from top of panel
	function drawLineToChallenge(direction, elm) {

		var svgAnim, viewboxW, viewboxH, pathW, pathH, pathX, pathY, startingY, startingX, offset, elm, time, nudge;

		//if for some reason we don't get reference to elm, just don't draw line here, we'll get it going again on the next panel
		if (!elm || elm === undefined) {
			// console.log("elm was undefined - don't draw line");
			return;
		}

		offset = $(elm).offset();

		if (!offset) {
			// console.log("offset was undefined - don't draw line");
			return;
		}

		//always direction = down
		viewboxW = 3;
		viewboxH = offset.top;
		pathX = 1.5;
		pathY = 0;
		pathW = 1.5;
		pathH = viewboxH;
		startingX = '50%';
		startingY = 0;
		time = viewboxH / 400;
		nudge = '-2px';

		svgAnim = '<div class="svg-' + direction + '-anim"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + viewboxW + ' ' + viewboxH + '" preserveAspectRatio="xMidYMin slice"><line class="path" x1="' + pathX + '" y1="' + pathY + '" x2="' + pathW + '" y2="' + pathH + '"/><line class="line" x1="' + pathX + '" y1="' + pathY + '" x2="' + pathW + '" y2="' + pathH + '"/></svg></div>';

		$('.current .optHolder').append('<div class="svg-options-anim-1"></div>');
		$('.current .optHolder .svg-options-anim-1').append(svgAnim).css({ top: startingY, left: startingX, width: viewboxW, height: viewboxH, marginLeft: nudge });

		TweenMax.to('.current .optHolder .svg-options-anim-1 .svg-' + direction + '-anim svg line.path', time, { drawSVG: "0% 100%", ease: Power0.easeNone, onComplete: function () { TweenMax.to('.optionWrap .svg-opt-anim svg line.path', .5, { drawSVG: "0% 100%" }); } });


		$(window).on('resize', function () {
			offset = $(elm).offset();

			//always direction = down
			viewboxW = 3;
			viewboxH = offset.top;
			pathX = 1.5;
			pathY = 0;
			pathW = 1.5;
			pathH = viewboxH;
			startingX = '50%';
			startingY = 0;
			time = viewboxH / 400;
			nudge = '-2px';

			svgAnim = '<div class="svg-' + direction + '-anim"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + viewboxW + ' ' + viewboxH + '" preserveAspectRatio="xMidYMin slice"><line class="path" x1="' + pathX + '" y1="' + pathY + '" x2="' + pathW + '" y2="' + pathH + '"/><line class="line" x1="' + pathX + '" y1="' + pathY + '" x2="' + pathW + '" y2="' + pathH + '"/></svg></div>';

			$('.current .optHolder .svg-options-anim-1').html(svgAnim).css({ top: startingY, left: startingX, width: viewboxW, height: viewboxH, marginLeft: nudge });

			TweenMax.to('.current .optHolder .svg-options-anim-1 .svg-' + direction + '-anim svg line.path', 0, { drawSVG: "0% 100%", ease: Power0.easeNone });
		});

	}

	function drawMiniGameLines(elm, top, sides, bottom, target) {

		var offset, elm, points, svgAnim, roundTop, roundLeft, start1, start2, left1, left2, viewboxW, viewboxH;

		//if for some reason we don't get reference to elm, just don't draw line here, we'll get it going again on the next panel
		if (!elm || elm === undefined) {
			// console.log("elm was undefined - don't draw line");
			return;
		}

		offset = $(elm).offset();
		// console.log('offset=' + offset.top + "," + offset.left);
		if (!offset) {
			// console.log("offset was undefined - don't draw line");
			return;
		}
		roundTop = Math.round(offset.top);
		roundLeft = Math.round(offset.left);

		start1 = $(window).width() / 2;
		start2 = roundTop - top;
		left1 = roundLeft + $(elm).width() + sides;
		left2 = roundTop + $(elm).height() + bottom;
		viewboxW = $(window).width();
		viewboxH = $(window).height();



		points = start1 + ',0,';
		points += start1 + ',' + start2 + ',';
		points += left1 + ',' + start2 + ',';
		points += left1 + ',' + left2 + ',';
		points += start1 + ',' + left2;

		svgAnim = '<svg version="1.1" id="minigame-anim" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + viewboxW + ' ' + viewboxH + '" preserveAspectRatio="xMidYMin slice"><polyline id="outline-path" class="path" points=' + points + ' /><polyline id="outline" class="line" points=' + points + ' /></svg>';

		$(target).prepend('<div class="svg-minigame-anim"></div>');
		$(target).prepend('<div class="svg-minigame-anim-R"></div>');
		$(target + ' .svg-minigame-anim').append(svgAnim);
		$(target + ' .svg-minigame-anim-R').append(svgAnim);


		TweenMax.to(target + ' .svg-minigame-anim svg polyline.path', 2.5, { drawSVG: "0% 100%", ease: Power0.easeNone });
		TweenMax.to(target + ' .svg-minigame-anim-R svg polyline.path', 2.5, { drawSVG: "0% 100%", ease: Power0.easeNone });


		$(window).on('resize', function () {
			if ($(window).width() >= 1024) {
				offset = $(elm).offset();

				roundTop = Math.round(offset.top);
				roundLeft = Math.round(offset.left);

				start1 = $(window).width() / 2;
				start2 = roundTop - top;
				left1 = roundLeft + $(elm).width() + sides;
				left2 = roundTop + $(elm).height() + bottom;
				viewboxW = $(window).width();
				viewboxH = $(window).height();



				points = start1 + ',0,';
				points += start1 + ',' + start2 + ',';
				points += left1 + ',' + start2 + ',';
				points += left1 + ',' + left2 + ',';
				points += start1 + ',' + left2;

				svgAnim = '<svg version="1.1" id="minigame-anim" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + viewboxW + ' ' + viewboxH + '" preserveAspectRatio="xMidYMin slice"><polyline id="outline-path" class="path" points=' + points + ' /><polyline id="outline" class="line" points=' + points + ' /></svg>';

				$(target + ' .svg-minigame-anim').html(svgAnim);
				$(target + ' .svg-minigame-anim-R').html(svgAnim);


				TweenMax.to(target + ' .svg-minigame-anim svg polyline.path', 0, { drawSVG: "0% 100%", ease: Power0.easeNone });
				TweenMax.to(target + ' .svg-minigame-anim-R svg polyline.path', 0, { drawSVG: "0% 100%", ease: Power0.easeNone });

			}
		});
	}


	//draw line out from bottom of minigame box to bottom of panel when minigame button is clicked
	function drawMiniGameLinesOut(direction, elm, bottom, target) {

		var svgAnim, viewboxW, viewboxH, pathW, pathH, pathX, pathY, startingY, startingX, offset, elm, time;

		//if for some reason we don't get reference to elm, just don't draw line here, we'll get it going again on the next panel
		if (!elm || elm === undefined) {
			// console.log("elm was undefined - don't draw line");
			return;
		}

		offset = $(elm).offset();

		if (!offset) {
			// console.log("offset was undefined - don't draw line");
			return;
		}

		//always direction = down
		viewboxW = 3;
		viewboxH = $(window).height() - (offset.top + $(elm).height() + bottom);
		pathX = 1.5;
		pathY = 0;
		pathW = 1.5;
		pathH = viewboxH;
		startingX = '50%';
		startingY = offset.top + $(elm).height() + bottom;
		time = viewboxH / 400;

		svgAnim = '<div class="svg-' + direction + '-anim"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + viewboxW + ' ' + viewboxH + '" preserveAspectRatio="xMidYMin slice"><line class="path" x1="' + pathX + '" y1="' + pathY + '" x2="' + pathW + '" y2="' + pathH + '"/><line class="line" x1="' + pathX + '" y1="' + pathY + '" x2="' + pathW + '" y2="' + pathH + '"/></svg></div>';

		$(target).prepend('<div class="svg-options-anim-out"></div>');
		$(target + ' .svg-options-anim-out').append(svgAnim).css({ top: startingY, left: startingX, width: viewboxW, height: viewboxH });

		TweenMax.to(target + ' .svg-' + direction + '-anim svg line.path', time, { drawSVG: "0% 100%", ease: Power0.easeNone });

	}

	function clickTitle(e, elm) {
		e.stopPropagation();
		if (elm.classList.contains('disabled')) {
			return;
		}
		//add class disabled so we don't let them keep clicking
		elm.classList.add('disabled');

		currentChallengesIndex = 0;
		addCollegeCost();
		//go to next section
		var lineElm = $('#title-template .title-img');
		drawMiniGameLinesOut('down', lineElm, 75, '.current');
		loadAndAnimateToNextSection('down', 0, addCurrent);
		if ($(window).width() < 813) {
			toggleFooter(event, '.mobile-display-btn').delay(1000);
		}
	}

	function clickMessage(e, elm) {
		e.stopPropagation();
		if (elm.classList.contains('disabled')) {
			return;
		}
		//add class disabled so we don't let them keep clicking
		elm.classList.add('disabled');

		drawLineFromMsg('down');

		loadAndAnimateToNextSection('down', 0, addCurrent);
	}

	function getJqueryElementOptions(elm) {
		var obj = {
			direction: elm.attr('data-direction'),
			panel: 'panel-' + elm.attr('data-id'),
			view: $('#panel-' + elm.attr('data-id')).attr('data-view')
		};
		return obj;
	}

	function checkIfCurrentChallengeIndexIsGreaterThanChallenges() {
		if (challengeData.length <= currentChallengesIndex) {
			//check if current index is
			currentSectionIndex++;
			//reset the current index to be 0 to start at beginning of new array
			previousChallengesIndex = currentChallengesIndex;
			currentChallengesIndex = 0;
		}
	}

	function increaseChallengesIndex() {
		previousChallengesIndex = currentChallengesIndex;
		currentChallengesIndex++;
	}

	function hideMeterValues() {
		var $meter;
		var meterValues;
		//find the meters that are showing
		$('#footerWrapper .barWrapper').each(function () {
			if ($(this).find('.money-tooltip').css('opacity') == 1) {
				$meter = $(this).attr('class').replace('barWrapper ', '');
				meterValues = new TimelineMax();
				meterValues.to('.' + $meter + ' .money-tooltip', .5, { opacity: 0 })
					.to('.' + $meter + ' .money-tooltip', 0, { y: 0 });
			}
		});
	}

	function challengeOnlyAnalytics(challenge) {
		var $sectionLabel = selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section.label,
			$sectionLabelUrl = $sectionLabel.replace(/ /g, "").toLowerCase(),
			$challengeId = challenge.id,
			$challengeLabel = challenge['label' + currentLanguage],
			$challengeText = $.trim($challengeLabel.replace(/(<([^>]+)>)/ig, " "));

		ga('send', 'pageview', '/game/' + $sectionLabelUrl + '/challenge/' + $challengeId);
		ga('send', 'event', $sectionLabel, 'Challenge', $challengeText);
	}

	function challengeAnalytics(challenge, outcome) {
		// console.log(challenge);
		// console.log(outcome);
		var $sectionLabel = selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section.label,
			$sectionLabelUrl = $sectionLabel.replace(/ /g, "").toLowerCase(),
			$challengeId = challenge.id,
			$outcomeId = outcome.Outcome.id,
			$outcomeLabel = outcome.Outcome['label' + currentLanguage];

		ga('send', 'pageview', '/game/' + $sectionLabelUrl + '/challenge/' + $challengeId + '/' + $outcomeId);
		ga('send', 'event', $sectionLabel, 'Outcome', $outcomeLabel);
	}

	function titleAnalytics(section) {
		var $title = selectedPathData.selectedPath.SectionSelectedPaths[section].Section.label,
			$titleLabelUrl = $title.replace(/ /g, "").toLowerCase();

		ga('send', 'pageview', '/game/' + $titleLabelUrl + '/start');
		ga('send', 'event', $title, 'Path', 'Start');
	}

	function endOfChallengeOutcomeSelection(challenge, outcome) {
		if (challenge && outcome) {
			challengeAnalytics(challenge, outcome);
		}
		handleIndexIncreases();
	}

	function handleIndexIncreases() {
		increaseChallengesIndex();
		checkIfCurrentChallengeIndexIsGreaterThanChallenges();
		if (checkIfNextChallengeIsNotGradSchool()) {
			handleIndexIncreases();
			return;
		}

		if (selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex] && selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section.showIfTransferring == 1 && inCommunityCollege) {
			currentChallengesIndex = challengeData.length;
			handleIndexIncreases();
			return;
		}

		if (checkIfNextIsRandomAndNoRandomChallenges()) {
			try {
				console.error('No random challenges for random spot in year ' + selectedPathData.selectedPath.label + ' in section index ' + currentSectionIndex + ' and challenge index ' + currentChallengesIndex);
			} catch (e) {

			}
			handleIndexIncreases();
			return;
		}

		insertRandomChallengesForAllSections();
	}

	function checkIfNextIsRandomAndNoRandomChallenges() {
		var tmpVal = false;
		try {
			tmpVal = selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section.SectionChallenges[currentChallengesIndex].random && selectedPathData.selectedPath.SectionSelectedPaths[currentSectionIndex].Section._randomChallenges.length == 0;
		} catch (e) {

		}
		return tmpVal;
	}

	function checkForSelectedOutcomeRecurring() {
		try {
			if (challengeData[currentChallengesIndex].Challenge.recurYearly) {
				if (!selectedPathData._recurYearlyChallenges) {
					selectedPathData._recurYearlyChallenges = [];
				}
				var tempChallenge = {};
				$.extend(true, tempChallenge, challengeData[currentChallengesIndex].Challenge);
				tempChallenge._selectedOutcome = {};
				$.extend(true, tempChallenge._selectedOutcome, selectedOutcome);
				selectedPathData._recurYearlyChallenges.push(tempChallenge);
			}
		} catch (e) {

		}
	}

	function checkIfNextChallengeIsNotGradSchool() {
		var $challenge = challengeData[currentChallengesIndex];
		//call for next challenge
		//if current view is title don't add 1 to index
		//no challenge let it handle normally
		if (!$challenge || !$challenge.Challenge) {
			return false;
		}

		//I know this is showOnlyGradSchool is true. It's actually reversed. if true and we're in grad school we don't show this challenge
		if ($challenge.Challenge.showOnlyGradSchool === 1 && gradSchool) {
			return true;
		}

		//not a grad school question always applies
		if ($challenge.Challenge.gradSchool === 0) {
			return false;
		}

		//is a grad school question. we are not grad school must increase
		if (!gradSchool) {
			return true;
		}

		//we going to grad school! we showing this challenge!
		return false;
	}

	function addUpAllRecurringCosts() {
		var totalCosts = 0;
		try {
			for (var i = 0, len = selectedPathData._recurYearlyChallenges.length; i < len; i++) {
				for (var j = 0, outcomeLen = selectedPathData._recurYearlyChallenges[i]._selectedOutcome.Outcome.OutcomeValues.length; j < outcomeLen; j++) {
					if (selectedPathData._recurYearlyChallenges[i]._selectedOutcome.Outcome.OutcomeValues[j].Value.label.toLowerCase() == 'loans') {
						totalCosts = totalCosts + selectedPathData._recurYearlyChallenges[i]._selectedOutcome.Outcome.OutcomeValues[j].amount;
					}
				}
			}
		} catch (e) {
			totalCosts = 0;
		}
		return totalCosts;
	}

	function addCollegeCost() {
		//don't add debt until sophomore year bc freshman year is handled by picking college
		if (currentSectionIndex > 1 && currentSectionIndex < selectedPathData.selectedPath.SectionSelectedPaths.length) {
			var recurringCosts = addUpAllRecurringCosts();
			animateMeterValues('loans', selectedCollegeCost + recurringCosts);
			calculateLoanAndApplyChange(meterLoans + selectedCollegeCost + recurringCosts);
			setTimeout(function () {
				removeCoin('loans');
			}, meterCoinWaitTimeout);
		}
	}

	function gradClick(i) {
		//console.log('grad click');
		// var i = $(this).index();
		switch (i) {
			case 0:
				gradSchool = true;
				break;
			case 1:
				gradSchool = false;
				break;
		}
		//console.log('gradSchool: ' + gradSchool);
	}

	function getOutcomeSelectedFromSlider(selectedVal, outcomes) {
		var i, len, closestWithoutGoingOverValue, returnOutcome, outcomeMap = {}, outcomeValuesArray = [], parsedVal;
		for (i = 0, len = outcomes.length; i < len; i++) {
			parsedVal = outcomes[i].Outcome.label;
			try {
				parsedVal = parseInt(parsedVal);
			} catch (e) {
				// console.log(e);
			}
			outcomeValuesArray.push(parsedVal);
			outcomeMap[outcomes[i].Outcome.label] = i;
		}
		for (i = 0; i < len; i++) {
			if (!closestWithoutGoingOverValue && closestWithoutGoingOverValue != 0) {
				closestWithoutGoingOverValue = outcomeValuesArray[i];
			} else if (outcomeValuesArray[i] <= selectedVal && closestWithoutGoingOverValue < outcomeValuesArray[i]) {
				closestWithoutGoingOverValue = outcomeValuesArray[i];
			}
		}

		return outcomeMap[closestWithoutGoingOverValue];
	}

	function clickSlider(e, elm) {
		e.stopPropagation();

		var opts = getJqueryElementOptions($(elm)),
			sliderValue = $('.handle__text').text();

		getClosestWithoutGoingOverOutcomeFromValueForCurrentChallenge(sliderValue, opts, elm);
	}

	function getClosestWithoutGoingOverOutcome(val) {
		var $challenge = challengeData[currentChallengesIndex],
			outcomeIndex = getOutcomeSelectedFromSlider(val, $challenge.Challenge.ChallengeOutcomes),
			outcome = $challenge.Challenge.ChallengeOutcomes[outcomeIndex];

		return outcome;
	}

	function getClosestWithoutGoingOverOutcomeFromValueForCurrentChallenge(val, opts, elm) {

		//get the current challenge so we can get outcomes
		var $challenge = challengeData[currentChallengesIndex],
			outcomeIndex = getOutcomeSelectedFromSlider(val, $challenge.Challenge.ChallengeOutcomes),
			outcome = getClosestWithoutGoingOverOutcome(val);

		//draw line out of minigame panel
		var lineElm;
		var bottom;
		if ($('#optSlider').length) {
			lineElm = $('#rangeholder');
			bottom = 130;
		} else if ($('#optRegister').length) {
			lineElm = $('#optRegister .register-timer');
			bottom = 100;
		} else if ($('#optWhackAMole').length) {
			// console.log('whack game');
			lineElm = $('#optWhackAMole .whack-a-mole-items');
			bottom = 170;
		}
		// console.log('lineElm=' + lineElm);
		drawMiniGameLinesOut('down', lineElm, bottom, '.current');
		selectedPathData._usedChallenges.push($challenge.Challenge.id);
		selectedOutcome = outcome;
		checkForSelectedOutcomeRecurring();
		if (selectedOutcome.Outcome.OutcomeChallenges.length > 0) {
			handleArrayOfOutcomeChallenges(selectedOutcome.Outcome.OutcomeChallenges)
				.then(function () {
					loadNextChallenge($challenge.Challenge, selectedOutcome, opts.direction, elm);
				})
				.catch(function () {
					loadNextChallenge($challenge.Challenge, selectedOutcome, opts.direction, elm);
				})
		} else {
			loadNextChallenge($challenge.Challenge, selectedOutcome, opts.direction, elm);
		}


		// function loadNextChallenge() {
		// 	endOfChallengeOutcomeSelection($challenge.Challenge, selectedOutcome);
		//     console.log(elm);
		// 	//TODO
		// 	//Did this the cheap way. I know what that first section is current rest are in order of outcomes
		// 	//Could break somehow? based on where slider is?
		// 	animateOutcomes(outcome)
		// 		.then(function () {
		//             //drawLineFromOptSelection(elm, opts.direction, 'default', addCurrent);
		//             loadAndAnimateToNextSection(opts.direction, 0, addCurrent);
		// 		})
		// 		.catch(function (err) {

		// 		})
		// }
	}

	function loadGradSchoolQuestionTemplate(panelNm) {
		var challenge = gradSchoolChallenge;
		// panel = addNewPanel(),
		// panelNm = "#panel-" + panel;

		$('#' + panelNm).html(window["app-templates"]['../client/features/templates/majorsGradSchool' + currentLanguage + '.html']);
		$('#' + panelNm + ' .text').html(gradSchoolChallenge.label);
		for (var i = 0, len = gradSchoolChallenge.ChallengeOutcomes.length; i < len; i++) {
			$('#' + panelNm + ' > div.optionWrap:eq(' + i + ')').html(gradSchoolChallenge.ChallengeOutcomes[i].Outcome['label' + currentLanguage]);
		}
		animatePanel(panelNm, 'down', 0,
			function ($direction, $panel) {
				handleSectionClassesAfterPanelMoved($panel);
				removeAllExceptCurrent();
				drawLinesAfterScreenHasAnimated($panel, 'down');
			});
		turnBtnOn();
	}

	function clickGradSchool(e, elm, isAttendingGradSchool, direction) {
		e.stopPropagation();

		gradSchool = isAttendingGradSchool;

		handleIndexIncreases();

		var selectedOutcome = gradSchoolChallenge.ChallengeOutcomes[isAttendingGradSchool ? 0 : 1];
		var panel = addNewPanel();
		displayMessage(0, selectedOutcome.Outcome['message' + currentLanguage], panel, true);
		animatePanel('panel-' + panel, direction, 0, addCurrent);
	}

	function clickTransferSchool(e, elm, isAttendingTransferSchool, direction, index) {
		e.stopPropagation();

		inCommunityCollege = !isAttendingTransferSchool;
		if (!inCommunityCollege) {
			for (var i = 0; i < colleges.selectedPaths.length; i++) {
				if (colleges.selectedPaths[i].SelectedPathCollegeType.label.toLowerCase() == 'public') {
					selectedCollegeCost = colleges.selectedPaths[i].College.inStateCost - colleges.selectedPaths[i].College.financialAid;
					break;
				}
			}
		}

		clickOutcome(direction, index, e, elm);
	}

	function clickMajor(e, elm) {
		e.stopPropagation();
		var panel,
			index = elm.attributes['data-index'].value;
		selectedMajor = majorsArray[index];

		// if (selectedMajor.gradSchool) {
		// 	loadGradSchoolQuestionTemplate();
		// 	return;
		// }
		try {
			selectedOutcome.Outcome.message = null;
		} catch (e) {

		}

		handleIndexIncreases();
		var lineElm = $('#optMajors .majors-slick');
		drawMiniGameLinesOut('down', lineElm, 40, '.current');
		loadAndAnimateToNextSection('down', 0, addCurrent);
	}

	function loadChallengeAfterMajor() {
		//console.log('load next challenge after grad question');
		var $challenge = challengeData[currentChallengesIndex + 1];
		//console.log($challenge);
		var panel = sectionId();

		//create new panel
		$('#main-wrapper').append('<section id="panel-' + panel + '" class="panel bck-' + currentSectionIndex + '" data-view="challenge"></section><div id="background-' + panel + '" class="panel background-panel bck-' + currentSectionIndex + '"></div>');

		//check new challenges outcomes
		var challenge = $challenge.Challenge;
		var outcomes = $challenge.Challenge.ChallengeOutcomes.length;

		insertIntoTemplate(outcomes, panel, challenge);
		createDisplay = 'displaychallenge';
	}

	function checkSectionViews() {
		var selectOption;
		//check the data view attribute of each section
		$('section').each(function (i) {
			//skip the first section
			if (i !== 0) {
				var view = $(this).attr('data-view');
				if (view === 'title') {
					//if there is a title option
					selectOption = 'title';
				} else if (view === 'challenge') {
					//if there is a challenge option
					selectOption = 'challenge';
				}
			}
		});

		return selectOption;
	}

	function addNewPanel() {
		var panel = sectionId();
		//create new panel
		$('#main-wrapper').append('<section id="panel-' + panel + '" class="direction-' + globalDirection + ' panel bck-' + currentSectionIndex + '" data-view="challenge"></section><div id="background-' + panel + '" class="panel background-panel bck-' + currentSectionIndex + '"></div>');
		//switch <body> background color when background panel image changes so don't see cream line when panels animate.
		switch (currentSectionIndex) {
			case 0:
				switchBodyBgColor('#fff0d2');
				break;
			case 1:
				switchBodyBgColor('#1e2633');
				break;
			case 2:
				switchBodyBgColor('#01b6ad');
				break;
			case 3:
				switchBodyBgColor('#c6e2b6');
				break;
			case 4:
				switchBodyBgColor('#9F2046');
				break;
			case 5:
				switchBodyBgColor('#01b6ad');
				break;
			default:
				switchBodyBgColor('#fff0d2');
		}

		return panel;
	}

	function switchBodyBgColor(newColor) {
		var to = setTimeout(function () {
			$('body').css('background', newColor);
			clearTimeout(to);
		}, 2000);
	}

	function displayChallenge($challenge, $SelectedOutcome, panel) {

		currentView = 'challenge';

		if (currentSectionIndex == selectedPathData.selectedPath.SectionSelectedPaths.length - 1 && currentChallengesIndex == 2 && selectedMajor && selectedMajor.gradSchool && !hadGradSchoolQuestion) {
			//hack to put this at the beginning and let grad school handle correctly
			currentChallengesIndex = 1;
			hadGradSchoolQuestion = true;
			loadGradSchoolQuestionTemplate('panel-' + panel);
			return;
		}

		//check new challenges outcomes
		var challenge = $challenge.Challenge,
			outcomes = $challenge.Challenge.ChallengeOutcomes.length,
			gradQuestion = $challenge.Challenge.gradSchool;

		//if grad school question add gradOpt class
		if (gradQuestion == 1) {
			$('#panel-' + panel).addClass('gradOpt');
		}

		//check the challenge type for custom templates
		var custom = $challenge.Challenge.ChallengeAnswerType.type;
		if (window.location.hash.indexOf('#question-') >= 0) {
			custom = window.location.hash.substr(10);
		}
		if (custom.toLowerCase().indexOf('slider') >= 0) {
			loadSliderTemplate(challenge, panel, custom);
		} else {
			switch (custom) {
				case 'Select':
					loadSelectTemplate(challenge, panel);
					break;
				case 'Major':
					getMajorBasedOnCollege()
						.then(function () {
							loadMajorsTemplate(challenge, panel);
							//change data-view to major
							// $('#panel-' + panel).addClass('majorQuestion');
						})
						.catch(function (err) {
							console.log(err);
							loadMajorsTemplate(challenge, panel);
							//change data-view to major
							// $('#panel-' + panel).addClass('majorQuestion');
						});

					break;
				case 'Register':
					loadRegisterTemplate(challenge, panel);
					break;
				case 'Shopping':
					loadDefaultTemplate(challenge['label' + currentLanguage], panel, window["app-templates"]["../client/features/templates/optShoppingStartScreen" + currentLanguage + ".html"]);
					break;
				case 'Whack':
					loadDefaultTemplate(challenge['label' + currentLanguage], panel, window["app-templates"]["../client/features/templates/whackAMoleStartScreen" + currentLanguage + ".html"]);
					break;
				case 'Transfer':
					loadTemplateOpt($challenge.Challenge, panel, window["app-templates"]["../client/features/templates/transferSchool" + currentLanguage + ".html"], 2, true);
					break;
				case 'Study':
					loadPsychologyTemplate(challenge, panel);
					break;
				default:
					if (challenge.ChallengeOutcomes.length > 1) {
						shuffle(challenge.ChallengeOutcomes);
					}

					//if the type is 'Default'
					insertIntoTemplate(outcomes, panel, challenge);
			}
		}
		createDisplay = 'displaychallenge';

		challengeOnlyAnalytics(challenge);
	}

	function getMajorBasedOnCollege() {
		return new Promise(function (resolve, reject) {
			if (!allMajorsArray) {
				getMajors()
					.then(function (majors) {
						allMajorsArray = new Object(majors);
						majorsArray = allMajorsArray.filter(function (major) {
							return major.isCommunityCollege == inCommunityCollege
						});
						resolve();
					})
					.catch(function (err) {
						reject(err);
					})
				return;
			}
			majorsArray = allMajorsArray.filter(function (major) {
				return major.isCommunityCollege == inCommunityCollege
			});
			resolve();
		});
	}


	/**
	 * Shuffles array in place.
	 * @param {Array} a items The array containing the items.
	 */
	function shuffle(a) {
		var j, x, i;
		for (i = a.length; i; i--) {
			j = Math.floor(Math.random() * i);
			x = a[i - 1];
			a[i - 1] = a[j];
			a[j] = x;
		}
	}

	function getLastSectionUsed() {
		var lastSectionIndex = selectedPathData.selectedPath.SectionSelectedPaths.length - 1;
		if (currentChallengesIndex === 0 && currentSectionIndex > 0 && lastSectionIndex == currentSectionIndex) {
			lastSectionIndex--;
		}
		if (currentSectionIndex < lastSectionIndex) {
			return currentChallengesIndex === 0 && currentSectionIndex > 0 ? currentSectionIndex - 1 : currentSectionIndex;
		}
		for (var i = lastSectionIndex; i >= 0; i--) {
			if (selectedPathData.selectedPath.SectionSelectedPaths[i] && selectedPathData.selectedPath.SectionSelectedPaths[i].Section.showIfTransferring == 1 && inCommunityCollege) {

			} else {
				lastSectionIndex = i;
				break;
			}
		}
		return lastSectionIndex;
	}

	function displayMessage($SelectedOutcome, $message, panel, ignoreBackgroundColorChange) {
		//console.log('display message');
		// var panel = sectionId(),
		var option,
			tmpCurrentSection = getLastSectionUsed(),
			section = $('#panel-' + panel);

		currentView = 'message';

		if (currentChallengesIndex === 0 && currentSectionIndex > 0 && !ignoreBackgroundColorChange) {
			section.removeClass('bck-' + currentSectionIndex);
			section.addClass('bck-' + tmpCurrentSection);
			var background = $('#background-' + panel);
			background.removeClass('bck-' + currentSectionIndex);
			background.addClass('bck-' + tmpCurrentSection);
		}

		//create new panel
		section.attr('data-view', 'message');
		// $('#main-wrapper').append('<section id="panel-' + panel + '" class="panel bck-' + tmpCurrentSection + '" data-view="message"></section><div id="background-' + panel + '" class="panel background-panel bck-' + tmpCurrentSection + '"></div>');
		//add panel id to the options
		// option = $('section:first .answers .opt:nth-child(' + ($SelectedOutcome + 1) + ')');
		// if(option.length === 0) {
		// 	option = $('section:first .answers .optWrap:nth-child(' + ($SelectedOutcome + 1) + ') .opt');
		// }
		// option.attr('data-id', panel);
		loadDefaultTemplate($message, panel, window["app-templates"]["../client/features/templates/message" + currentLanguage + ".html"]);
	}

	function checkIfNextChallengeIsNull() {
		return challengeData.length <= currentChallengesIndex;
	}

	function displayTitle(sectionIndex, panel) {

		var $title = selectedPathData.selectedPath.SectionSelectedPaths[sectionIndex].Section.label;
		currentSection = selectedPathData.selectedPath.SectionSelectedPaths[sectionIndex].sectionId;
		currentView = 'title';

		//create new panel
		$('#main-wrapper').append('<section id="panel-' + panel + '" class="panel addDebt bck-' + sectionIndex + '" data-view="title"></section><div id="background-' + panel + '" class="panel background-panel bck-' + sectionIndex + '"></div>');

		loadTitleTemplate(panel, selectedPathData.selectedPath, sectionIndex);
		createDisplay = 'displaytitle';

		titleAnalytics(sectionIndex);
	}

	function displayGraduationEnd(panel) {
		console.log('displayGraduationEnd-' + panel);
		// var panel = sectionId();
		currentView = 'displayGraduationEnd';

		//$('#main-wrapper').append('<section id="panel-' + panel + '" class="panel bck-5 endBtn" data-view="endTitle"></section><div id="background-' + panel + '" class="panel background-panel bck-5"></div>');

		//$('section:first .opt').attr('data-id', panel);

		//display Graduation title
		loadGradTitleTemplate(panel);
		// createDisplay = 'displayGraduationEnd';
	}

	function displayFinishEnd(panel) {
		// var panel = sectionId();
		currentView = 'title';
		$('#main-wrapper').append('<section id="panel-' + panel + '" class="panel bck-5" data-view="end"></section><div id="background-' + panel + '" class="panel background-panel bck-5"></div>');

		$('section:first .opt').attr('data-id', panel);


		//check if user is going to grad school or not


		if (gradSchool === true) {
			//user going to grad school display grad school end
			//console.log('user going to grad school');
			loadGradEndTemplate(panel);
		} else {
			//console.log('user not going to grad school');
			if (meterConnections <= 250) {
				//load connections end if connections is less than 25%
				//console.log('connections are low');
				loadConnectionsEnd(panel);
			} else {
				//user not going to grad school display finished results
				//console.log('connections are high');
				loadFinishEndTemplate(panel);
			}
		}
		trackEndScreens();
		$('#footerWrapper .tooltip').remove();
		$('#footerWrapper .money-tooltip').remove();
		// hideFooter('-50px');

		//createDisplay = 'displayend';
	}

	function displayMeterEnd(panel) {
		//console.log('display meter end');
		//get the next panel index
		// var panel = sectionId();
		currentView = 'end';
		//remove all other panels
		removeAllExceptCurrent();

		//create the new end frame
		$('#main-wrapper').append('<section id="panel-' + panel + '" class="panel bck-' + currentSectionIndex + '" data-view="end"></section><div id="background-' + panel + '" class="panel background-panel bck-' + currentSectionIndex + '"></div>');

		//check the meters and find out which is 0
		if (meterFocus <= 0) {
			loadFocusEnd(panel);
		} else if (meterHappiness <= 0) {
			loadHappinessEnd(panel);
		}
		shareTwitter();
	}

	function trackEndScreens() {
		if (gradSchool === true) {
			//user going to grad school
			ga('send', 'pageview', '/game/outcome/graduate/grad-school');
			ga('send', 'event', 'Game Over', 'Graduate', 'Grad School');
		} else {
			if (meterConnections <= 250) {
				//user had low connections
				ga('send', 'pageview', '/game/outcome/graduate/low-connections');
				ga('send', 'event', 'Game Over', 'Graduate', 'Low Connections');
			} else {
				var $salary = selectedMajor.meanSalary;

				if ($salary < meterLoans) {
					//user had really high debt
					ga('send', 'pageview', '/game/outcome/graduate/too-much-debt');
					ga('send', 'event', 'Game Over', 'Graduate', 'Too Much Debt');
				} else {
					//user had a good balance
					ga('send', 'pageview', '/game/outcome/graduate');
					ga('send', 'event', 'Game Over', 'Graduate', 'Good Balance');
				}
			}
		}
	}

	function sectionId() {
		sectionIdCounter++;
		return sectionIdCounter;
	}

	function animateMeterValues($meter, $value) {
		$meter = $meter.toLowerCase();

		var sign
		if ($value < 0) {
			sign = "-";
		} else {
			sign = "+";
		}

		var focusLogo =
			'<svg version="1.1" id="icon-focusLogo" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 250 250">' +
			'<g>' +
			'<circle class="icon-focusLogo" cx="109.4" cy="140.6" r="15.6" />' +
			'<path class="icon-focusLogo" d="M195.3,62.5c-4.3,0-7.8-3.5-7.8-7.8V31.2c0-4.3,3.5-7.8,7.8-7.8s7.8,3.5,7.8,7.8v23.4C203.1,59,199.6,62.5,195.3,62.5z M218.7,62.5h-23.4c-4.3,0-7.8-3.5-7.8-7.8s3.5-7.8,7.8-7.8h20.2L229,33.4l-5.9-3c-1.5-0.8-2.7-2-3.5-3.5l-3-5.9l-15.8,15.8c-3.1,3.1-8,3.1-11,0c-3.1-3.1-3.1-8,0-11l23.4-23.4c1.8-1.8,4.2-2.6,6.8-2.2c2.5,0.4,4.6,2,5.7,4.2l6.6,13.3l13.3,6.6c2.2,1.1,3.8,3.3,4.2,5.7s-0.4,5-2.2,6.8l-23.4,23.4C222.8,61.7,220.8,62.5,218.7,62.5zM109.4,148.4c-2,0-4-0.8-5.5-2.3c-3.1-3.1-3.1-8,0-11l85.9-85.9c3.1-3.1,8-3.1,11,0c3.1,3.1,3.1,8,0,11l-85.9,85.9C113.4,147.7,111.4,148.4,109.4,148.4z M109.4,187.5c-25.9,0-46.9-21-46.9-46.9s21-46.9,46.9-46.9c12.5,0,24.3,4.9,33.1,13.7c3.1,3.1,3.1,8,0,11.1c-3.1,3-8,3-11.1,0c-5.9-5.9-13.7-9.2-22.1-9.2c-17.2,0-31.2,14-31.2,31.3s14,31.3,31.2,31.3s31.2-14,31.2-31.3c0-4.3,3.5-7.8,7.8-7.8s7.8,3.5,7.8,7.8C156.2,166.5,135.2,187.5,109.4,187.5z M109.4,218.7c-43.1,0-78.1-35-78.1-78.1s35-78.1,78.1-78.1c20.9,0,40.5,8.1,55.2,22.9c3.1,3.1,3.1,8,0,11c-3.1,3.1-8,3.1-11,0c-11.8-11.8-27.5-18.3-44.2-18.3c-34.5,0-62.5,28-62.5,62.5s28,62.5,62.5,62.5s62.5-28,62.5-62.5c0-7.8-1.5-15.6-4.6-23.2c-1.6-4,0.3-8.6,4.3-10.2c4-1.6,8.6,0.3,10.2,4.3c3.8,9.4,5.7,19.2,5.7,29C187.5,183.7,152.5,218.7,109.4,218.7z M109.4,250C49.1,250,0,200.9,0,140.6S49.1,31.2,109.4,31.2c29.2,0,56.7,11.4,77.3,32c3.1,3.1,3.1,8,0,11c-3.1,3.1-8,3.1-11,0c-17.7-17.7-41.2-27.5-66.3-27.5c-51.7,0-93.7,42.1-93.7,93.8s42.1,93.8,93.7,93.8s93.7-42.1,93.7-93.8c0-15.9-4.1-31.7-12-45.7c-2.1-3.8-0.8-8.5,3-10.6c3.7-2.1,8.5-0.8,10.6,3c9.2,16.3,14,34.8,14,53.3C218.7,200.9,169.7,250,109.4,250z" />' +
			'</g>' +
			'</svg>';
		
		var connectionsLogo =
			'<svg id="icon-connectionLogo" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 223.5 250.2">' +
			'<g>' +
			'<circle class="icon-connectionLogo" cx="110.9" cy="14.3" r="14.2" />' +
			'<circle class="icon-connectionLogo" cx="43.6" cy="121.5" r="14.2" />' +
			'<path class="icon-connectionLogo" d="M179.9,154.5l30.8-25.6c3.3-2.7,8.2-2.3,10.9,1c2.7,3.3,2.3,8.2-1,10.9l-20.5,17l0.1,0c0,0-11.8,8.9-11.8,20.5c0,9.8,4.6,18.7,6,21.4l23.5,36.2c2.3,3.6,1.3,8.4-2.3,10.7c-3.6,2.3-8.4,1.3-10.7-2.3l-24.5-37.9l-25.6,40c-1.5,2.3-4,3.6-6.5,3.6c-1.4,0-2.9-0.4-4.2-1.2c-3.6-2.3-4.7-7.1-2.4-10.7l24.5-38.4c1.2-2.5,5-11.5,5-21.4c0-11.7-11.7-20.5-11.7-20.5l0.1,0c-28.8-23.5-48.4-58.5-48.4-58.5c-25,45.6-47.7,58.5-47.7,58.5l0.1,0c0,0-11.8,8.9-11.8,20.5c0,9.8,4.6,18.8,6,21.4L81.6,236c2.3,3.6,1.3,8.4-2.3,10.7c-3.6,2.3-8.4,1.3-10.7-2.3l-24.5-37.9l-25.6,40c-1.5,2.3-4,3.6-6.5,3.6c-1.4,0-2.9-0.4-4.2-1.2c-3.6-2.3-4.7-7.1-2.4-10.7L30,199.8c1.2-2.5,5-11.5,5-21.4c0-11.7-11.7-20.5-11.7-20.5l0.1,0l-20.5-17c-3.3-2.7-3.7-7.6-1-10.9c2.7-3.3,7.6-3.7,10.9-1l30.7,25.6c0,0,32-18.9,53.8-61.9c1.2-2.5,5-11.5,5-21.4c0-11.7-11.7-20.5-11.7-20.5l0.1,0l-20.5-17c-3.3-2.7-3.7-7.6-1-10.9c2.7-3.3,7.6-3.7,10.9-1l30.7,25.5l30.8-25.6c3.3-2.7,8.2-2.3,10.9,1c2.7,3.3,2.3,8.2-1,10.9l-20.5,17l0.1,0c0,0-11.8,8.9-11.8,20.5c0,9.8,4.6,18.7,6,21.3C125.4,92.5,140.3,125.1,179.9,154.5z" />' +
			'<circle class="icon-connectionLogo" cx="179.9" cy="121.5" r="14.2" />' +
			'</g>' +
			'</svg>'

		var happinessLogo = 
			'<svg version="1.1" id="icon-happinessLogo" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 250 250"><g><g><path class="icon-happinessLogo" d="M125,250C56.1,250,0,193.9,0,125S56.1,0,125,0s125,56.1,125,125S193.9,250,125,250z M125,18.9C66.5,18.9,18.9,66.5,18.9,125S66.5,231.1,125,231.1S231.1,183.5,231.1,125S183.5,18.9,125,18.9z"/></g><g><path class="icon-happinessLogo" d="M125,191.8c-28.2,0-55.4-19.4-61.7-44.1c-1.3-5.1,1.7-10.2,6.8-11.5c5-1.3,10.2,1.7,11.5,6.8c4.3,16.5,23.7,30,43.4,30c19.5,0,39.4-13.7,43.4-29.9c1.3-5.1,6.4-8.2,11.4-6.9c5.1,1.3,8.2,6.4,6.9,11.4C180.6,172.3,153.5,191.8,125,191.8z"/></g><g><circle class="icon-happinessLogo" cx="90.1" cy="94.5" r="12.6"/></g><g><circle class="icon-happinessLogo" cx="153.9" cy="94.5" r="12.6"/></g></g></svg>'
		

		var meterLogo
		if ($meter == 'focus') {
			meterLogo = focusLogo;
		} else if ($meter == 'connections') {
			meterLogo = connectionsLogo;
		} else {
			meterLogo = happinessLogo;
		}

		if ($meter !== 'loans' && $(window).width() > 813) {
			$('.meter-' + $meter + ' .money-value').html(sign);
		} else if ($meter !== 'loans' && $(window).width() < 813) {
			$('.meter-' + $meter + ' .money-value').html(sign + meterLogo);
		} else {
			$('.meter-' + $meter + ' .money-value').html(sign + '$' + Math.abs($value));
		}
		//animate money
		var coin = new TimelineMax();

		if ($(window).width() < 600) {
			coin.to('.meter-' + $meter + ' .money-tooltip', 1.5, { x: 225 })
			.to('.meter-' + $meter + ' .money-tooltip', .5, { opacity: 0.9 }, '-=1.5');
		} else if ($(window).width() < 813 && $(window).width() >= 		600) {
			coin.to('.meter-' + $meter + ' .money-tooltip', 1.5, { x: 300 })
			.to('.meter-' + $meter + ' .money-tooltip', .5, { opacity: 0.9 }, '-=1.5');
		} else {
			coin.to('.meter-' + $meter + ' .money-tooltip', 1.5, { y: -15 })
			.to('.meter-' + $meter + ' .money-tooltip', .5, { opacity: 1 }, '-=1.5');
		}
	}

	function removeCoin(meterType) {
		var coin = new TimelineMax();
		// coin.to('.meter-' + meterType.toLowerCase() + ' .money-tooltip', .5, { opacity: 0 })
		// .to('.meter-' + meterType.toLowerCase() + ' .money-tooltip', 0, { y: 0 });
		
		if ($(window).width() < 813) {
			coin.to('.meter-' + meterType.toLowerCase() + ' .money-tooltip', .5, { opacity: 0 })
			.to('.meter-' + meterType.toLowerCase() + ' .money-tooltip', 0, { x: 0 });
		} else {
			coin.to('.meter-' + meterType.toLowerCase() + ' .money-tooltip', .5, { opacity: 0 })
			.to('.meter-' + meterType.toLowerCase() + ' .money-tooltip', 0, { y: 0 });
		}		
	}

	function removeCoins(selectedValue) {
		try {
			for (var i = 0, len = selectedValue.Outcome.OutcomeValues.length; i < len; i++) {
				removeCoin(selectedValue.Outcome.OutcomeValues[i].Value.label.toLowerCase());
			}
		} catch (e) {

		}

	}

	function meterLoop(i, selectedValue) {
		if (!selectedValue.Outcome.OutcomeValues[i]) {
			return;
		}
		var label = selectedValue.Outcome.OutcomeValues[i].Value.label,
			meterClass = label.toLowerCase(),
			value = selectedValue.Outcome.OutcomeValues[i].amount;
		//console.log('label: ' + label);
		//console.log('value: ' + value);

		//checks for bad data
		if (value) {
			var calculation,
				percent,
				backgroundColor,
				barColor;
			//start value is different based on meter type
			switch (label) {
				case 'Focus':
					// Cap our values at 1000 so we can't have over 100% (for logic, not display)
					meterFocus = Math.min(meterFocus + value, 1000);
					calculation = meterFocus / 1000;
					percent = (calculation * 100);

					//requested for testing to put meter values as attributes
					$('.meter-focus').attr('data-value', meterFocus);
					break;
				case 'Connections':
					// Cap our values at 1000 so we can't have over 100% (for logic, not display)
					meterConnections = Math.min(meterConnections + value, 1000);
					if (meterConnections < 0) {
						meterConnections = 0;
					}
					calculation = meterConnections / 1000;
					percent = (calculation * 100);

					//requested for testing to put meter values as attributes
					$('.meter-connections').attr('data-value', meterConnections);
					break;
				case 'Happiness':
					// Cap our values at 1000 so we can't have over 100% (for logic, not display)
					meterHappiness = Math.min(meterHappiness + value, 1000);
					calculation = meterHappiness / 1000;
					percent = (calculation * 100);

					//requested for testing to put meter values as attributes
					$('.meter-happiness').attr('data-value', meterHappiness);
					break;
				case 'Loans':
					calculateLoanAndApplyChange(meterLoans + value);
					break;
			}

			if (percent >= 100) {
				percent = 100;
			}
			
			if (percent <= 25) {
				//change background color
				backgroundColor = '#9e2145';
				barColor = '#8a1c3d';
			} else {
				backgroundColor = '#01b6ad';
				barColor = '#019d95';
			}

			if (label !== 'Loans') {
				TweenMax.to('.meter-' + meterClass + ' .value', 1, { css: { width: percent + '%', background: backgroundColor } });
				TweenMax.to('.meter-' + meterClass + ' .bar', 1, { css: { 'background-color': barColor } });
			}

			// if ($(window).width() < 813) {
			// 	console.log("happinessLogo selector:", $('.icon-happinessLogo'))
			// 	$('.icon-happinessLogo').css({ 'stroke': backgroundColor, 'fill': backgroundColor });
			// 	console.log("bg colors after setting:", $('.icon-happinessLogo').css(["stroke", "fill"]), backgroundColor);
			// 	$('.icon-connectionLogo').css({ 'stroke': backgroundColor, 'fill': backgroundColor });
			// 	$('.icon-focusLogo').css({ 'stroke': backgroundColor, 'fill': backgroundColor });
			// }

			animateMeterValues(meterClass, value);
		}
	}

	function handleMeterLoopTimeout(i, selectedValue) {
		return new Promise(function (resolve, reject) {
			setTimeout(
				function () {
					meterLoop(i, selectedValue);
					resolve();
				}, i * 500);
		});
	}

	function animateOutcomes(selectedValue) {
		return new Promise(function (resolve, reject) {
			var promises = [];
			for (var i = 0, len = selectedValue.Outcome.OutcomeValues.length; i < len; i++) {
				promises.push(handleMeterLoopTimeout(i, selectedValue));
			}

			Promise.all(promises)
				.then(function (success) {
					if (selectedValue.Outcome.OutcomeValues.length > 0) {
						setTimeout(function () {
							removeCoins(selectedValue);
							resolve();
						}, meterCoinWaitTimeout);
					} else {
						resolve();
					}
				})
				.catch(function (err) {
					console.log(err);
					reject();
				});
		});
	}

	function handleAnimationAfterMeterLoop($panel, $direction) {
		//check if meters are at 0
		if (meterFocus <= 0 || meterHappiness <= 0 && currentView == 'message') {
			displayMeterEnd();
		} else {
			animatePanel($panel, $direction, 0, addCurrent);
		}
	}

	function checkForTitle($title) {
		if (currentView === 'title') {
			//auto animate to next screen
			animatePanel('panel-' + loadNextSection(), 'down', 5, addCurrent);
		}
	}

	//All Template functions
	function insertIntoTemplate($outcomes, $section, $challenge) {
		if ($outcomes == 1) {
			loadTemplateOpt($challenge, $section, window["app-templates"]["../client/features/templates/optone.html"], $outcomes);
		} else if ($outcomes == 2) {
			loadTemplateOpt($challenge, $section, window["app-templates"]["../client/features/templates/opttwo.html"], $outcomes);
		} else if ($outcomes == 3) {
			loadTemplateOpt($challenge, $section, window["app-templates"]["../client/features/templates/optthree.html"], $outcomes);
		} else if ($outcomes == 4) {
			loadTemplateOpt($challenge, $section, window["app-templates"]["../client/features/templates/optfour.html"], $outcomes);
		} else if ($outcomes >= 5) {
			loadTemplateOpt($challenge, $section, window["app-templates"]["../client/features/templates/optfive.html"], $outcomes);
		}
	}

	function loadSelectTemplate(challenge, section) {
		//console.log('load option three');
		var panelNm = '#panel-' + section;
		$(panelNm).html(window["app-templates"]["../client/features/templates/optSelect" + currentLanguage + ".html"]);
		//inject the challenge text into the template
		var label = challenge['label' + currentLanguage];
		$(panelNm + ' .label').html('Select Template: ' + label);
		$(panelNm + ' .opt').each(function (i) {
			var challengeOutcomes = challenge.ChallengeOutcomes[i].Outcome['label' + currentLanguage];
			$(this).html(challengeOutcomes);
		});

		// turnBtnOn();
	}

	function getSliderMinAndMax(challengeOptions, min) {
		var returnVal,
			tmpLabelVal;
		for (var i = 0, len = challengeOptions.length; i + 1 < len; i++) {
			try {
				tmpLabelVal = !returnVal ? parseInt(challengeOptions[i].Outcome.label) : parseInt(challengeOptions[i + 1].Outcome.label);
			} catch (e) {
				console.log(e);
				tmpLabelVal = null;
				//should splice off that option as it's invalid
				continue;
			}
			if (!returnVal && returnVal != 0) {
				returnVal = tmpLabelVal;
				continue;
			}
			if (min) {
				returnVal = returnVal < tmpLabelVal ? returnVal : tmpLabelVal;
			} else {
				returnVal = returnVal >= tmpLabelVal ? returnVal : tmpLabelVal;
			}
		}

		return returnVal;
	}

	function getSliderRange(range) {

		var tmpRange = 10;

		if (!range) {
			return tmp;
		}
		try {
			tmpRange = parseInt(range);
			return tmpRange;
		} catch (e) {
			console.log(e);
		}
		switch (range) {
			case 'decimial':
				tmpRange = '.5';
				break;
		}

		return tmpRange;
	}

	function loadSliderTemplate(challenge, section, range) {
		//console.log('load option four');
		var panelNm = '#panel-' + section,
			step = 10,
			min = getSliderMinAndMax(challenge.ChallengeOutcomes, true),
			max = getSliderMinAndMax(challenge.ChallengeOutcomes, false);
			range = range.split('Slider')[1];
			step = getSliderRange(range);

		var elm = $(panelNm).html(window["app-templates"]["../client/features/templates/optSlider" + currentLanguage + ".html"]),
			sliderElm = $('input[type="range"]');
		//inject the challenge text into the template
		var label = challenge['label' + currentLanguage];
		$(panelNm + ' .label').html(label);

		sliderElm.attr('min', min);
		sliderElm.attr('max', max);
		sliderElm.attr('step', step);
		sliderElm.attr('value', min);




		sliderElm.rangeslider({
			// Feature detection the default is `true`.
			// Set this to `false` if you want to use
			// the polyfill also in Browsers which support
			// the native <input type="range"> element.
			polyfill: false,

			// Default CSS classes
			// rangeClass: 'rangeslider',
			// disabledClass: 'rangeslider--disabled',
			// horizontalClass: 'rangeslider--horizontal',
			// verticalClass: 'rangeslider--vertical',
			// fillClass: 'rangeslider__fill',
			// handleClass: 'rangeslider__handle',

			// Callback function
			onInit: function () {
				//console.log('init');
				$('.rangeslider__handle').append('<span class="handle__text"></span>');
				$('.handle__text').text(min);
				var len = $('.money_stack').children().length;
				var num = Math.round((min / sliderElm.attr('max')) * len);
				//console.log(min +", "+num +","+ len);
				for (var i = 0; i < len; i++) {
					if (i < num) {
						$('.dollar:eq(' + i + ')').css('opacity', '1');
					} else {
						$('.dollar:eq(' + i + ')').css('opacity', '0');
					}
				}
			},

			// Callback function
			onSlide: function (position, value) {
				var len = $('.money_stack').children().length;
				$('.handle__text').text(value);
				var num = Math.round((value / sliderElm.attr('max')) * len);
				// console.log(value +", "+num +","+ len);
				for (var i = 0; i < len; i++) {
					if (i < num) {
						$('.dollar:eq(' + i + ')').css('opacity', '1');
					} else {
						$('.dollar:eq(' + i + ')').css('opacity', '0');
					}
				}
			},

			// Callback function
			onSlideEnd: function (position, value) {
				var len = $('.money_stack').children().length;
				$('.handle__text').text(value);
				var num = Math.round((value / sliderElm.attr('max')) * len);
				//console.log(value +", "+num +","+ len);
				for (var i = 0; i < len; i++) {
					if (i < num) {
						$('.dollar:eq(' + i + ')').css('opacity', '1');
					} else {
						$('.dollar:eq(' + i + ')').css('opacity', '0');
					}
				}
			}
		});
	}


	function loadRegisterTemplate(challenge, section) {

		var panelNm = "#panel-" + section;
		var elm = $(panelNm).html(window["app-templates"]["../client/features/templates/optRegister" + currentLanguage + ".html"]);

		var label = challenge['label' + currentLanguage];
		$(panelNm + ' .label').html(label),
			section = $(panelNm);
		registerPercentage = 0;
		registerProgressTimer = new ProgressBar.Circle(section.find('.register-timer .timer')[0], {
			strokeWidth: 8,
			easing: 'linear',
			duration: 30000,
			color: '#03d7c3',
			trailColor: backButtonColors[currentSectionIndex],
			trailWidth: 8,
			svgStyle: {
				width: '100%',
				height: '100%'
			}
		});
		registerBar = section.find('.register-progress .value')[0];

		$('#optRegister .piece').css('fill', backButtonColors[currentSectionIndex]);

		registerProgressTimer.setText("30");
		registerProgressTimer.set(0);

		$(".progressbar-text").css('color', backButtonColors[currentSectionIndex]);

		if ($(window).width() > 813) {
			moveFooter('-50px');
		}
	}

	function clickStartRegisterClasses(e, elm) {
		$('#timerForRegisterClasses').css('opacity', 0);
		$('.register-header').css('display', 'none');
		$('.countdown').css('display', 'block');
		$('.timer').css('display', 'block');
		$('.register-progress').css('display', 'flex');
		//this is the parent element
		if (elm.classList.contains('running')) {
			return;
		}
		e.stopPropagation();
		//add class running so we don't let them keep clicking
		elm.classList.add('running');
		var section = $(elm.closest('section')),
			timer = registerClassesTimer,
			intervalTime = 500,
			intervalCanceler,
			valOfLine,
			timerCanceler,
			timerString,
			countDownTimerCounter = 0,
			countDownTimerInterval = setInterval(countDownTimer, 100),
			enabled = true,
			counter = 0;


		function countDownTimer() {
			countDownTimerCounter++;
			timerString = ((timer - (countDownTimerCounter * 100)) / 100).toString();
			registerProgressTimer.setText(timerString.length < 3 ? (timerString.length > 1 ? timerString.slice(0, 1) + '.' + timerString.slice(1) : '0.' + timerString) : timerString.slice(0, 2));
			if (timer <= countDownTimerCounter * 100) {
				clearInterval(countDownTimerInterval);
				//turn countdown number teal when reach 0
				$(".progressbar-text").css('color', '#03d7c3');
				$('#optRegister .piece').css('fill', '#03d7c3');
				return;
			}
		}


		// $('body').bind('touchend', touchEndClickForRegister);
		$('body').on('touchend click tap', registerTemplateClick);

		registerProgressTimer.animate(1.0);
		countDownTimer();
		//turn handle teal when timer starts
		$('.countdown').find('.piece').addClass('on');

		timerCanceler = setTimeout(function () {
			// $('body').unbind('touchend', touchEndClickForRegister);
			$('body').off('touchend click tap', registerTemplateClick);
			enabled = false;
			clearTimeout(intervalCanceler);
			handleResults();
		}, timer);

		setTimeout(function () {
			lowerProgressBar();
		}, intervalTime);

		function touchEndClickForRegister(e) {
			e.preventDefault();
			// Add your code here. 
			registerTemplateClick();
		}

		function lowerProgressBar() {
			if (!enabled) {
				clearTimeout();
				return;
			}
			if (counter % 25 == 0) {
				intervalTime = intervalTime - 25;
			}
			if (registerPercentage - 1 >= 0 && registerPercentage % 25 != 0) {
				registerPercentage = registerPercentage - 1;
				registerBar.style.width = registerPercentage + '%';
			}
			intervalCanceler = setTimeout(function () {
				lowerProgressBar();
			}, intervalTime);
		}

		function registerTemplateClick(e) {
			e.stopPropagation();
			e.preventDefault();
			if (enabled) {
				counter++;
				if (registerPercentage + 1 <= 100) {
					registerPercentage = registerPercentage + 1;
					registerBar.style.width = registerPercentage + '%';
				}
				if (registerPercentage % 25 == 0) {
					intervalTime = intervalTime - 25;
				}
			}
		}

		function handleResults() {
			// alert('Clicked ' + counter + ' Progress: ' + line.value() * 100);
			setTimeout(function () {

				document.getElementById("timerForRegisterClasses").innerHTML = 'TIME\'S UP!';
				$('#timerForRegisterClasses').css('opacity', 1);
				setTimeout(function () {
					//loop outcomes do same thing as we do for sliders click the outcome that fits the nearest selected for value
					getClosestWithoutGoingOverOutcomeFromValueForCurrentChallenge(registerPercentage, { direction: 'down' });
					moveFooter();
				}, 2000);
			}, 100);
		}
	}

	function clickShoppingItem(e, elm) {
		if (elm.children[1].classList.contains("disab")){
			elm.children[1].classList.remove("disab");
		}
		else{
			elm.children[1].classList.add("disab");
		}
		e.stopPropagation();

		if (elm.classList.contains('selected')) {
			elm.classList.remove('selected');
		} else {
			elm.classList.add('selected');
		}
		setShoppingCartBadge();
	}

	function setShoppingCartBadge() {
		var selectedItems = $('.shopping-items > .selected').length,
			imageWrapper = $('span.image-wrapper');

		imageWrapper.attr('data-content', selectedItems);

		if (selectedItems === 0) {
			imageWrapper.removeClass('show-count');
		} else {
			imageWrapper.addClass('show-count');
		}

	}

	function clickShoppingStart(e, elm) {
		e.stopPropagation();

		if ($(window).width() > 813) {
			moveFooter('-50px');
		}
		
		loadShoppingTemplate(elm);
		turnBtnOn();
	}

	function clickShoppingCart(e, elm) {
		e.stopPropagation();

		if (elm.classList.contains('disabled')) {
			return;
		} else {
			elm.classList.add('disabled');
		}

		var itemsSelected = $('#optShopping .shopping-cart-item.selected .text'),
			outcomesSelected = {
				Outcome: {
					OutcomeValues: [{
						Value: {
							label: 'Loans',
							amount: 0
						},
						amount: 0
					}]
				}
			};
		for (var i = 0, len = itemsSelected.length; i < len; i++) {
			for (var j = 0, outcomeValuesLength = shoppingCartItems.length; j < outcomeValuesLength; j++) {
				if (shoppingCartItems[j].ChallengeOutcomes[0].Outcome['label' + currentLanguage] == itemsSelected[i].innerHTML) {
					outcomesSelected.Outcome.OutcomeValues[0].amount += shoppingCartItems[j].ChallengeOutcomes[0].Outcome.OutcomeValues[0].Value.amount;
					break;
				}
			}
		}

		selectedOutcome = getClosestWithoutGoingOverOutcome(outcomesSelected.Outcome.OutcomeValues[0].amount);
		selectedOutcome.Outcome.OutcomeValues.push(outcomesSelected.Outcome.OutcomeValues[0]);

		checkForSelectedOutcomeRecurring();
		console.log(outcomesSelected);
		//how to go to next message?
		moveFooter();

		//draw line out of minigame panel
		var lineElm = $('#optShopping .shopping-items');
		drawMiniGameLinesOut('down', lineElm, 110, '.current');
		handleArrayOfOutcomeChallenges(selectedOutcome.Outcome.OutcomeChallenges)
			.then(function () {
				handleIndexIncreases();

				//TODO
				//Did this the cheap way. I know what that first section is current rest are in order of outcomes
				//Could break somehow? based on where slider is?
				animateOutcomes(selectedOutcome)
					.then(function () {
						// loadAndAnimateToNextSection('down', 0, addCurrent);
						var panelToAnimateTo = addNewPanel();
						currentView = 'message';
						loadDefaultTemplate(selectedOutcome.Outcome['message' + currentLanguage], panelToAnimateTo, window["app-templates"]["../client/features/templates/optShoppingMessage" + currentLangugage + ".html"]);
						// displayMessage(0, selectedOutcome.Outcome.message, panelToAnimateTo);
						try {
							$('#panel-' + panelToAnimateTo + ' .text').prepend('<p class="subtext">Your Total: <span class="total">$' + outcomesSelected.Outcome.OutcomeValues[0].amount + '</span></p>');
						} catch (e) {
							console.log(e);
						}
						var option,
							tmpCurrentSection = getLastSectionUsed(),
							section = $('#panel-' + panelToAnimateTo);

						currentView = 'message';

						if (currentChallengesIndex === 0 && currentSectionIndex > 0) {
							section.removeClass('bck-' + currentSectionIndex);
							section.addClass('bck-' + tmpCurrentSection);
							var background = $('#background-' + panelToAnimateTo);
							background.removeClass('bck-' + currentSectionIndex);
							background.addClass('bck-' + tmpCurrentSection);
						}

						// drawLineFromOptSelection(elm, 'down', 'panel-' + panelToAnimateTo, addCurrent);
						animatePanel('panel-' + panelToAnimateTo, 'down', 0, addCurrent);
					})
					.catch(function (err) {
						// drawLineFromOptSelection(elm, 'down', 'default', addCurrent);
						loadAndAnimateToNextSection('down', 0, addCurrent);
					})
			})
			.catch(function (err) {
				handleIndexIncreases();

				//TODO
				//Did this the cheap way. I know what that first section is current rest are in order of outcomes
				//Could break somehow? based on where slider is?
				animateOutcomes(selectedOutcome)
					.then(function () {
						// loadAndAnimateToNextSection('down', 0, addCurrent);
						var panelToAnimateTo = addNewPanel();
						currentView = 'message';
						loadDefaultTemplate(selectedOutcome.Outcome['message' + currentLanguage], panelToAnimateTo, window["app-templates"]["../client/features/templates/optShoppingMessage" + currentLangugage + ".html"]);
						// displayMessage(0, selectedOutcome.Outcome.message, panelToAnimateTo);
						try {
							$('#panel-' + panelToAnimateTo + ' .text').prepend('<p class="subtext">Your Total: <span class="total">$' + outcomesSelected.Outcome.OutcomeValues[0].amount + '</span></p>');
						} catch (e) {
							console.log(e);
						}

						var option,
							tmpCurrentSection = getLastSectionUsed(),
							section = $('#panel-' + panelToAnimateTo);

						currentView = 'message';

						if (currentChallengesIndex === 0 && currentSectionIndex > 0) {
							section.removeClass('bck-' + currentSectionIndex);
							section.addClass('bck-' + tmpCurrentSection);
							var background = $('#background-' + panelToAnimateTo);
							background.removeClass('bck-' + currentSectionIndex);
							background.addClass('bck-' + tmpCurrentSection);
						}


						//drawLineFromOptSelection(elm, 'down', 'panel-' + panelToAnimateTo, addCurrent);
						animatePanel('panel-' + panelToAnimateTo, 'down', 0, addCurrent);
					})
					.catch(function (err) {
						// drawLineFromOptSelection(elm, 'down', 'default', addCurrent);
						loadAndAnimateToNextSection('down', 0, addCurrent);
					})
			})


	}


	function loadShoppingTemplate(elm) {

		var challenge = challengeData[currentChallengesIndex].Challenge,
			panel = addNewPanel(),
			panelNm = "panel-" + panel;

		$('#' + panelNm).append(window["app-templates"]["../client/features/templates/optShopping" + currentLanguage + ".html"]);

		var htmlToAdd = '';

		for (var i = 0, len = shoppingCartItems.length; i < len; i++) {
			//get from title the price and remove the price shown.
			//if no price we select from a random price
			htmlToAdd = htmlToAdd + '<div class="shopping-cart-item" onclick="clickShoppingItem(event, this)" data-index="' + i + '">\
				<div class="card-front"><img src="' + shoppingCartItems[i].imageUrl + '" class="shopping-cart-image"></img>\
				</div><div class="card-back"><div class="text">' + shoppingCartItems[i].ChallengeOutcomes[0].Outcome['label' + currentLanguage] + '</div><div class="cost">$' + shoppingCartItems[i].ChallengeOutcomes[0].Outcome.OutcomeValues[0].Value.amount.toLocaleString() + '</div></div>\
			</div>';
		}

		$('#' + panelNm + ' .shopping-items').html(htmlToAdd);

		var animPanel = 'panel-' + (panel - 1);
		drawLineFromMsg('down', animPanel);


		animatePanel(panelNm, 'down', 0, addCurrent);
	}


	function clickPsychologyStudyOption(e, elm, direction) {
		e.stopPropagation();
		if ($(window).width() > 813) {
			moveFooter();
		}

		//create final message
		var messagePanel = addNewPanel();
		displayMessage(0, (currentLanguage.length == 0 ? '10 hours of this later, you realize that time is money too.' : '10 horas después, se da cuenta que el tiempo es también oro.'), messagePanel);


		//increment progress bar
		animateOutcomes(challengeData[currentChallengesIndex].Challenge.ChallengeOutcomes[0])
			.then(function () {
				//draw line out of game
				var lineElm = $('#optPsychology .study-slick');
				drawMiniGameLinesOut('down', lineElm, 30, '.current');

				handleIndexIncreases();
				animatePanel('panel-' + messagePanel, 'down', 0, addCurrent);
			})
			.catch(function (err) {

			})
	}

	function clickWhackAMoleStartMessage(e, elm) {
		e.stopPropagation();

		var panel = addNewPanel(),
			panelNm = "panel-" + panel;
		$('#' + panelNm).append(window["app-templates"]["../client/features/templates/whackAMole" + currentLanguage + ".html"]);

		drawLineFromMsg('down');

		animatePanel('panel-' + panel, 'down', 0,
			function ($direction, $panel) {
				handleSectionClassesAfterPanelMoved($panel);
				removeAllExceptCurrent();
				drawLinesAfterScreenHasAnimated($panel, 'down');
				if ($(window).width() > 813) {
					moveFooter('-50px');
				}
				whackAMoleCounter = 0;
				whackAMoleCorrectGuesses = 0;
				whackAMoleMissedGuesses = 0;
				whackAMoleWrongGuesses = 0;
				whackAMoleContainer = $('#optWhackAMole .whack-a-mole-items');
				whackAMoleOptions = $('#optWhackAMole .whack-a-mole-items .whack-a-mole-item');
				whackAMoleProgressBar = $('.bar.bar-whack-a-mole');
				whackAMolePercentage = .5;

			});
	}

	function clickWhackAMoleStartGame(e, elm) {
		e.stopPropagation();
		buildWhackAMoleSelection();
		setAllWhackAMoleImagesNoneDraggable();
		$('#optWhackAMole .whack-a-mole-items .whack-a-mole-item .whack-a-mole-item-name').css('display', 'none');
		$('.whack-a-mole-header').css('display', 'none');
		$('.whack-a-mole-items').css('display', 'flex');
		$('.whack-a-mole-meter').css('display', 'flex');
		$(elm).off().css({ 'visibility': 'hidden' });
		//$(elm).remove();
	}

	function setAllWhackAMoleImagesNoneDraggable() {
		var images = $('#optWhackAMole img');
		for (var i = 0, len = images.length; i < len; i++) {
			images[i].draggable = false;
		}
	}

	function buildWhackAMoleSelection() {
		if (whackAMoleCounter >= whackAMoleLoopTimes) {
			// alert('game over!! Correct clicks: ' + whackAMoleCorrectGuesses + ' missed clicks: ' + whackAMoleMissedGuesses + ' wrong clicks: ' + whackAMoleWrongGuesses);
			whackAMoleOptions = null;
			// alert('Need to load next challenge');
			getClosestWithoutGoingOverOutcomeFromValueForCurrentChallenge(whackAMolePercentage * 100, { direction: 'down' });
			moveFooter();
			return;
		}
		if (whackAMoleCounter % 5 === 0) {
			whackAMoleTimerMin = whackAMoleTimerMin - 50;
			whackAMoleTimerMax = whackAMoleTimerMax - 50;
		}
		removeOrAddClassesFromAllOptions(whackAMoleContainer, ['no-whack'], false);
		removeOrAddClassesFromAllOptions(whackAMoleOptions, ['highlight', 'selected', 'disabled'], false);
		whackAMoleTimeout = setTimeout(function () {
			highlightRandomWhackAMoles(whackAMoleOptions);
			whackAMoleCounter++;
			whackAMoleTimeout = setTimeout(function () {
				timeUpWhackAMole();
			}, randomIntFromInterval(whackAMoleTimerMin, whackAMoleTimerMax))
			whackAMoleClickDisabled = false;
		}, 500);

	}

	function timeUpWhackAMole() {
		whackAMoleClickDisabled = true;
		removeOrAddClassesFromAllOptions(whackAMoleContainer, ['no-whack'], true);
		removeOrAddClassesFromAllOptions(whackAMoleOptions, ['disabled'], true);
		whackAMolePercentage = calculateWhackAMoleScore(whackAMolePercentage);
		var backgroundColors = calculateBackgroundColor(whackAMolePercentage * 100);
		setBarBackgroundColor(backgroundColors.barColor);
		TweenMax.to('.bar.bar-whack-a-mole .value', 1, { css: { width: whackAMolePercentage * 100 + '%', background: backgroundColors.backgroundColor } });
		setTimeout(function () {
			buildWhackAMoleSelection();
		}, 1000);

	}

	function setBarBackgroundColor(color) {
		whackAMoleProgressBar.css('background-color', color);
	}

	function calculateWhackAMoleScore(currentPercentageWidth) {
		for (var i = 0, len = whackAMoleOptions.length; i < len; i++) {
			if (whackAMoleOptions[i].classList.contains('highlight')) {
				if (whackAMoleOptions[i].classList.contains('selected')) {
					whackAMoleCorrectGuesses++;
				} else {
					whackAMoleMissedGuesses++;
					currentPercentageWidth = currentPercentageWidth - .01;
				}
			} else if (whackAMoleOptions[i].classList.contains('selected')) {
				whackAMoleWrongGuesses++;
			}
		}
		return currentPercentageWidth;
	}

	function calculateBackgroundColor(percentage) {
		var colors = {
			backgroundColor: '#01b6ad',
			barColor: ''
		}
		if (percentage <= 25) {
			//change background color
			colors.backgroundColor = '#9e2145';
			colors.barColor = '#8a1c3d';
		} else {
			colors.backgroundColor = '#01b6ad';
			colors.barColor = '#019d95';
		}
		return colors;
	}

	function clickWhackAMoleOption(e, elm) {
		e.stopPropagation();
		if (whackAMoleClickDisabled) {
			return;
		}
		if (elm.classList.contains('disabled')) {
			return;
		}
		elm.classList.add('selected');
		if (elm.classList.contains('highlight')) {
			whackAMolePercentage = whackAMolePercentage + .01;
			var backgroundColors = calculateBackgroundColor(whackAMolePercentage * 100);
			setBarBackgroundColor(backgroundColors.barColor);
			TweenMax.to('.bar.bar-whack-a-mole .value', 1, { css: { width: whackAMolePercentage * 100 + '%', background: backgroundColors.backgroundColor } });
		} else {
			whackAMolePercentage = whackAMolePercentage - .02;
			var backgroundColors = calculateBackgroundColor(whackAMolePercentage * 100);
			setBarBackgroundColor(backgroundColors.barColor);
			TweenMax.to('.bar.bar-whack-a-mole .value', 1, { css: { width: whackAMolePercentage * 100 + '%', background: backgroundColors.backgroundColor } });
		}
		checkIfNextWhackAMole();
	}


	function removeOrAddClassesFromAllOptions(options, classesToAddOrRemove, addClasses) {
		addClasses = addClasses == true;
		for (var i = 0, len = options.length; i < len; i++) {
			for (var j = 0, classesToAddOrRemoveLength = classesToAddOrRemove.length; j < classesToAddOrRemoveLength; j++) {
				if (addClasses) {
					options[i].classList.add(classesToAddOrRemove[j]);
				} else {
					options[i].classList.remove(classesToAddOrRemove[j]);
				}
			}
		}
	}

	function highlightRandomWhackAMoles(options) {
		var lenOfOptions = options.length - 1,
			randomNumberToHighlight = randomIntFromInterval(1, lenOfOptions),
			randomlySelectedIndex,
			highlightedIndexes = [];
		for (var i = 0, len = randomNumberToHighlight; i < len; i++) {
			randomlySelectedIndex = getIndexNotYetSelected(highlightedIndexes, lenOfOptions);
			if (randomlySelectedIndex === -1) {
				continue;
			}
			highlightedIndexes.push(randomlySelectedIndex);
			options[randomlySelectedIndex].classList.add('highlight');
		}
	}

	function getIndexNotYetSelected(highlightedIndexes, len) {
		if (highlightedIndexes.length >= len) {
			return -1;
		}
		var randomInt = randomIntFromInterval(0, len);
		if (highlightedIndexes.indexOf(randomInt) === -1) {
			return randomInt;
		} else {
			return getIndexNotYetSelected(highlightedIndexes, len);
		}
	}

	function checkIfNextWhackAMole() {
		var isHighlightedUnchecked = false;
		for (var i = 0, len = whackAMoleOptions.length; i < len; i++) {
			if (whackAMoleOptions[i].classList.contains('highlight') && !whackAMoleOptions[i].classList.contains('selected')) {
				isHighlightedUnchecked = true;
				break;
			}
		}
		if (!isHighlightedUnchecked) {
			clearTimeout(whackAMoleTimeout);
			timeUpWhackAMole();
		}
	}

	function loadMajorsTemplate(challenge, section) {
		var panelNm = "#panel-" + section;
		$(panelNm).html(window["app-templates"]["../client/features/templates/optMajors.html"]);
		//setup the slick slider
		$('.majors-slick').slick({
			slidesToShow: 3,
			slidesToScroll: 3
		});
		//go through array
		for (var i = 0, len = majorsArray.length; i < len; i++) {
			var major = majorsArray[i]['major' + currentLanguage].toUpperCase(),
				salary = majorsArray[i].meanSalary,
				employRate = majorsArray[i].employmentRate;

			if (employRate == null) {
				employRate = 0;
			}


			//add elements to the slider
			// $('.majors-slick').slick('slickAdd', '<div class="major-group" onclick="clickMajor(event, this)" data-index="' + i + '"><div class="major-name">' + major + '</div><div class="major-salary">$' + salary.toLocaleString() + '</div></div>');
			$('.majors-slick').slick('slickAdd', '<div class="major-group" onclick="clickMajor(event, this)" data-index="' + i + '">\
				<div class="major-name">' + major + '</div>\
				<div class="major-detail">\
				<div class="md-salary">\
					<div class = "md-label">' + (currentLanguage == '_es' ? 'salario inicial' : 'starting salary' + '</div><div class="value">$') + salary.toLocaleString() + '</div>\
				</div>\
				<div class="md-employmentrate">\
					<div class = "md-label">' + (currentLanguage == '_es' ? 'tasa de desempleo' : 'unemployment rate') + '</div><div class="value">' + (100 - parseFloat(employRate)).toFixed(1).toLocaleString() + '%</div>\
				</div>\
				</div>\
			</div>');

		}

		$(panelNm + ' .label').html(challenge['label' + currentLanguage]);
	}


	function loadPsychologyTemplate(challenge, section) {
		var panelNm = "#panel-" + section;
		$(panelNm).html(window["app-templates"]["../client/features/templates/psychologyStudy" + currentLanguage + ".html"]);
		//setup the slick slider
		$('.study-slick').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			draggable: false,
			touchMove: false,
			swipe: false
		});

		$(panelNm + ' .label').html(challenge['label' + currentLanguage]);

		$('.psychology-row span, .psychology-row div').on('click', function (e) {
			if ($(this).hasClass('study-last')) {
				clickPsychologyStudyOption(e, this, 'down');
			} else {
				$(".study-slick").slick('slickNext');
				$('.slick-slide').blur();
			}
		});
		if ($(window).width() > 813) {
			moveFooter('-50px');
		}
	}


	function loadDefaultTemplate($message, $panelId, template) {
		//console.log('load message');
		var panelNm = '#panel-' + $panelId;
		$(panelNm).html(template);
		$(panelNm + ' .text').html($message);

	}

	function loadTitleTemplate($panel, selectedPath, sectionId) {
		//console.log('load title');
		var panelNm = '#panel-' + $panel;
		var panel = 'panel-' + $panel;
		$(panelNm).html(window["app-templates"]["../client/features/templates/title" + currentLanguage + ".html"]);
		if (selectedPath.label != 'Community College' && currentLanguage != '_es') {
			var year = 'Year ';
			year = year  + sectionId + ':';
			$(panelNm + ' .year-text').html(year);
		} else {
			$(panelNm + ' .year-text').remove();
		}
		var label = selectedPath.SectionSelectedPaths[sectionId].Section.label;
		var imgSrc = label.replace(' ', '-').toLowerCase();
		//console.log(imgSrc);
		if(currentLanguage == '_es') {
			
			switch(sectionId) {
				case 1:
				$(panelNm + ' .title-img img').attr('src', 'images/year-one_es.png');
				break;
				case 2:
				$(panelNm + ' .title-img img').attr('src', 'images/year-two_es.png');
				break;
				case 3:
				$(panelNm + ' .title-img img').attr('src', 'images/year-three_es.png');
				break;
				case 4:
				$(panelNm + ' .title-img img').attr('src', 'images/year-four_es.png');
				break;
			}
		} else {
			$(panelNm + ' .title-img img').attr('src', 'images/' + imgSrc + '.png');
		}
		
		$(panelNm + ' .title-img img').attr('alt', label);

		turnBtnOn();
	}

	function loadGradTitleTemplate($panel) {
		var panelNm = '#panel-' + $panel,
		text = currentLanguage == '_es' ? 'lo lograste' : 'You made it to';
		$(panelNm).html(window["app-templates"]["../client/features/templates/title" + currentLanguage + ".html"]);
		disableTooltips = true;
		$(panelNm + ' .year-text').html(text);
		//load image
		$(panelNm + ' .title-img img').attr('src', 'images/college-graduation' + currentLanguage + '.png');
		$(panelNm + ' .title-img img').attr('alt', 'Graduation');

		turnBtnOn();
	}

	function loadGradEndTemplate($panel) {
		var panelNm = '#panel-' + $panel,
		$message, $title;
		$(panelNm).html(window["app-templates"]["../client/features/templates/endframe" + currentLanguage + ".html"]);
		disableTooltips = true;
		shareTwitter();
		//this is the end
		$('#endFrame').addClass('graduate-end');
		//hide elements you won't need
		$('#endFrame .tabWrapper').remove();

		if(currentLanguage == '_es') {
			$message = "Usted tiene <span class='studentLoan'>$" + meterLoans.toLocaleString() + '</span> en deuda de préstamos estudiantiles. Y de dos a seis años para terminar.';
			$title = "Próxima parada:  Escuela de posgrado";
		} else {
			$message = "You've got <span class='studentLoan'>$" + meterLoans.toLocaleString() + '</span> in student loan debt. And two to six years of school to go.';
			$title = "Next Stop: Grad School";
		}
		

		$('#endFrame .endMessage').html($message);
		$('#endFrame .endTitle').html($title);

		turnBtnOn();

		//checkForTitle();
	}

	function loadCommunityEndTemplate($panel) {
		var panelNm = '#panel-' + $panel;
		$(panelNm).html(window["app-templates"]["../client/features/templates/endframe" + currentLanguage + ".html"]);
		disableTooltips = true;
		shareTwitter();
		//this is the end
		$('#endFrame').addClass('community-end');
		//hide elements you won't need
		$('#endFrame .tabWrapper').remove();
		$('#endFrame .endTip').remove();

		var $message = currentLanguage.length == 0 ? "You are now free to join the work-force. However, you can expect to make about 20% less each year than if you had a four-year degree. You're also slightly more likely to be unemployed." : "Ahora puede incorporarse al mundo de la fuerza laboral. Sin embargo, puede esperar ganar como el 20% menos cada año que si tuviera una carrera universitaria de cuatro años. También tiene una mayor posibilidad de estar desempleado.",
			$title = currentLanguage.length == 0 ? 'Congratulations, Graduate!' : '¡Felicitaciones, alumno graduado!';

		$('#endFrame .endMessage').html($message);
		$('#endFrame .endTitle').html($title);
	}

	function calculateAPR(loanamount, numpayments, baseannualrate, costs) {
        /*
        By Paul Cormier - Sep 10, 2010 - http://webmasterymadesimple.com
        loanamount 	= the amount borrowed
        numpayments	= number of monthly payments e.g. 30 years = 360
        baserate	= the base percentage rate of the loan. A 5.25% Annual Rate should be passed in as 0.0525 NOT 5.25
        costs		= the loan closing costs e.g. origination fee, broker fees, etc.
        */
		var rate = baseannualrate / 12;
		var totalmonthlypayment = ((loanamount + costs) * rate * Math.pow(1 + rate, numpayments)) / (Math.pow(1 + rate, numpayments) - 1);
		var testrate = rate;
		var iteration = 1;
		var testresult = 0;
		//iterate until result = 0
		var testdiff = testrate;
		while (iteration <= 100) {
			testresult = ((testrate * Math.pow(1 + testrate, numpayments)) / (Math.pow(1 + testrate, numpayments) - 1)) - (totalmonthlypayment / loanamount);
			if (Math.abs(testresult) < 0.0000001) break;
			if (testresult < 0) testrate += testdiff;
			else testrate -= testdiff;
			testdiff = testdiff / 2;
			iteration++;
		}
		testrate = testrate * 12;
		return testrate.toFixed(6);
	}

	function getMonthlyAmountAfterPercentage(totalYearAmount, percentage) {
		var amountToRemove = totalYearAmount * percentage;
		return (totalYearAmount - amountToRemove) / 12;
	}

	function calculateMonthlyLoanPayment(amount, apr, years) {
		var principal = parseFloat(amount);
		var interest = parseFloat(apr) / 100 / 12;
		var payments = parseFloat(years) * 12;
		// compute the monthly payment figure
		var x = Math.pow(1 + interest, payments); //Math.pow computes powers
		var monthly = (principal * x * interest) / (x - 1);
		return monthly.toFixed(0);
	}

	function loadFinishEndTemplate($panel) {
		var panelNm = '#panel-' + $panel;
		$(panelNm).html(window["app-templates"]["../client/features/templates/endframe" + currentLanguage + ".html"]);
		disableTooltips = true;
		shareTwitter();
		//this is the end
		//hide elements you won't need
		$('#endFrame .endTip').remove();

		var $salary = selectedMajor.meanSalary,
			$message,
			$endTitle,
			bHappy = true,
			faceicon,
			paycheckAmount = Math.ceil(getMonthlyAmountAfterPercentage($salary, .4) * 100) / 100;

		if ($salary < meterLoans) {
			bHappy = false;
		}

		var apr = calculateAPR(meterLoans, 120, 0.0445, $salary * 0.01069),
			amountWithApr = (meterLoans * apr) + meterLoans,
			loanBill = Math.ceil((amountWithApr / 120) * 100) / 100;

		try {
			//120 payments is 10 years
			loanBill = calculateMonthlyLoanPayment(meterLoans, 5, 10);
		} catch (e) {

		}

		/* No longer change the end message, just the happy/frowny faces
		if ($salary >= meterLoans) {
			//happy finish
			$message = "Yay you win at life!";
		} else {
			//sad end state
			$message = "As a general rule, your student loan debt should be less than your starting salary.";
		}
		*/
		if (bHappy) {
			$endTitle = currentLanguage.length == 0 ? "YOU WIN!" : "¡USTED GANA!";
		} else {
			$endTitle = currentLanguage.length == 0 ? "TRY AGAIN" : "INTENTAR DE NUEVO";
		}
		$message = currentLanguage.length == 0 ? "As a general rule, your student loan debt should be less than your starting salary." : "Como regla general, la deuda universitaria debería ser menos que su sueldo inicial.";

		//$('#end .label').html('<p>You finished! ' + $message + '</p><p>Total Debt: $' + meterLoans.toLocaleString() + '</p><p>College Cost: ' + collegeCost + '</p><p>Salary: $' + $salary.toLocaleString() + '</p><p>Focus: ' + meterFocus + '</p><p>Happiness: ' + meterHappiness + '</p><p>Connections: ' + meterConnections + '</p>');
		$('#endFrame .endTitle').html($endTitle);
		$('#endFrame .endMessage').html($message);
		$('#endFrame .debt-container .detail-money').html("$" + meterLoans.toLocaleString());
		$('#endFrame .salary-container .detail-money').html("$" + $salary.toLocaleString());
		$('#endFrame .loan-container .detail-money').html('$' + loanBill.toLocaleString());
		$('#endFrame .paycheck-container .detail-money').html('$' + paycheckAmount.toLocaleString());

		if (bHappy) {
			faceicon = '<svg version="1.1" id="icon-happiness" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 250 250"><g><g><path class="icon-happiness" d="M125,250C56.1,250,0,193.9,0,125S56.1,0,125,0s125,56.1,125,125S193.9,250,125,250z M125,18.9 C66.5,18.9,18.9,66.5,18.9,125S66.5,231.1,125,231.1S231.1,183.5,231.1,125S183.5,18.9,125,18.9z" /></g><g><path class="icon-happiness" d="M125,191.8c-28.2,0-55.4-19.4-61.7-44.1c-1.3-5.1,1.7-10.2,6.8-11.5c5-1.3,10.2,1.7,11.5,6.8 c4.3,16.5,23.7,30,43.4,30c19.5,0,39.4-13.7,43.4-29.9c1.3-5.1,6.4-8.2,11.4-6.9c5.1,1.3,8.2,6.4,6.9,11.4 C180.6,172.3,153.5,191.8,125,191.8z" /></g><g><circle class="icon-happiness" cx="90.1" cy="94.5" r="12.6" /></g><g><circle class="icon-happiness" cx="153.9" cy="94.5" r="12.6" /></g></g></svg>';
		} else {
			faceicon = '<svg version="1.1" id="frown-face" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 250 250"><g><g id="circle-line"><path d="M125,250C56.1,250,0,193.9,0,125S56.1,0,125,0s125,56.1,125,125S193.9,250,125,250z M125,18.9 C66.5,18.9,18.9,66.5,18.9,125S66.5,231.1,125,231.1S231.1,183.5,231.1,125S183.5,18.9,125,18.9z"/></g><g id="frown"><path d="M125,135.8c28.2,0,55.4,19.4,61.7,44.1c1.3,5.1-1.7,10.2-6.8,11.5c-5,1.3-10.2-1.7-11.5-6.8 c-4.3-16.5-23.7-30-43.4-30c-19.5,0-39.4,13.7-43.4,29.9c-1.3,5.1-6.4,8.2-11.4,6.9c-5.1-1.3-8.2-6.4-6.9-11.4 C69.4,155.3,96.5,135.8,125,135.8z"/></g><g id="left-eye"><circle cx="90.1" cy="94.5" r="12.6"/></g><g id="right-eye"><circle cx="153.9" cy="94.5" r="12.6"/></g></g></svg>';
		}
		//populate happy faces
		$('#endFrame .happiness-container .detail-icons .icon').html(faceicon);
		$('.tab2').hide();
		$('.tab1').show();
		turnBtnOn();

		//checkForTitle();
	}

	//tabs on final end screen
	function clickTab(tabNumber) {
		$('.tabContent').hide();
		$('.tabContent.tab' + tabNumber).show();
		// $('.tabBtn').removeClass('selected');
		// $(this).addClass('selected');

		// var $tab = $(this).attr('data-tab');
		// $('.tabContent').removeClass('show');
		// $('.tabContent.tab' + $tab).addClass('show');
	};

	function loadFocusEnd($panel) {
		//end the game
		var panelNm = 'panel-' + $panel;
		$('#' + panelNm).html(window["app-templates"]["../client/features/templates/endMeters" + currentLanguage + ".html"]);
		$('.meterTitle').html((currentLanguage.length == 0 ? 'Your focus is gone.' : 'Su concentración desapareció.'));
		$('.meterMessage').html(currentLanguage.length == 0 ? "You didn't keep up your GPA and you lost your scholarships. Without funding, you'll have to drop out. Unfortunately, you’ll still have to pay back the money you’ve borrowed so far." : "No mantuvo su promedio de calificaciones y perdió sus becas. Sin ese dinero, tendrá que darse de baja. Desafortunadamente, aún tendrá que devolver el dinero que pidió prestado hasta la fecha.");
		$('.learn-more').html((currentLanguage.length == 0 ? "But you're not alone: Distraction is one of <a target=\"_blank\" href=\"https://www.ngpf.org/blog/paying-for-college/one-strategy-keep-college-costs-graduate-4-years/\">six key reasons</a> people don’t finish college." : "No es la única persona: Las distracciones son una de las  <a target=\"_blank\" href=\"https://www.ngpf.org/blog/paying-for-college/one-strategy-keep-college-costs-graduate-4-years/\">seis razones</a> claves por las cuales no termina la gente su carrera universitaria."));

		$('.meterIcon').addClass('focusIcon').html('<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="network-fail-anim" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 600 75" style="enable-background:new 0 0 600 75;" xml:space="preserve"><style type="text/css">.st0{fill:#00B5AD;}</style><g id="target"><circle class="st0" cx="300" cy="35.5" r="4.9"/><path class="st0" d="M310.5,25c-2.1-2.1-4.6-3.4-7.4-4c0,0,0,0,0,0c-0.4-0.1-0.8-0.1-1.3-0.2c-0.1,0-0.1,0-0.2,0 c-0.5,0-1-0.1-1.5-0.1c-4,0-7.7,1.6-10.4,4.3c0,0-0.1,0-0.1,0.1c-2.1,2.1-3.4,4.6-4,7.4c0,0,0,0,0,0c-0.1,0.4-0.1,0.8-0.2,1.3 c0,0.1,0,0.1,0,0.2c0,0.5-0.1,1-0.1,1.5c0,8.2,6.6,14.8,14.8,14.8s14.8-6.6,14.8-14.8C314.8,31.5,313.2,27.8,310.5,25 C310.5,25.1,310.5,25.1,310.5,25z M300,45.4c-5.4,0-9.9-4.4-9.9-9.9c0-0.3,0-0.7,0.1-1c0,0,0-0.1,0-0.1c0-0.3,0.1-0.6,0.1-0.8 c0,0,0,0,0,0c0.9-4.5,4.9-7.9,9.7-7.9c0.3,0,0.7,0,1,0.1c0,0,0.1,0,0.1,0c0.3,0,0.6,0.1,0.8,0.1c0,0,0,0,0,0 c4.5,0.9,7.9,4.9,7.9,9.7C309.9,40.9,305.4,45.4,300,45.4z"/><path class="st0" d="M317.5,18.2c0,0-0.1-0.1-0.1-0.1c-4-4-9.3-6.5-14.9-7.1c0,0,0,0,0,0c-0.4,0-0.7-0.1-1.1-0.1 c-0.1,0-0.1,0-0.2,0c-0.4,0-0.8,0-1.3,0c-0.4,0-0.8,0-1.2,0c-6.3,0.3-11.9,3-16.1,7.1c0,0-0.1,0.1-0.1,0.1c-4,4-6.5,9.3-7.1,14.9 c0,0,0,0,0,0c0,0.4-0.1,0.7-0.1,1.1c0,0.1,0,0.1,0,0.2c0,0.4,0,0.8,0,1.3c0,13.6,11.1,24.6,24.6,24.6s24.6-11.1,24.6-24.6 c0-0.4,0-0.8,0-1.2C324.3,28,321.7,22.4,317.5,18.2z M300,55.2c-10.9,0-19.7-8.8-19.7-19.7c0-0.7,0-1.3,0.1-2c0-0.1,0-0.2,0-0.3 c0.1-0.6,0.1-1.1,0.3-1.7c0,0,0,0,0,0c1.3-6.4,5.7-11.7,11.6-14.2c0.1,0,0.3-0.1,0.4-0.1c1.8-0.7,3.6-1.2,5.4-1.4 c0.6-0.1,1.2-0.1,1.9-0.1c0.7,0,1.3,0,2,0.1c0.1,0,0.2,0,0.3,0c0.6,0.1,1.1,0.1,1.7,0.3c0,0,0,0,0,0c6.4,1.3,11.7,5.7,14.2,11.6 c0,0.1,0.1,0.3,0.1,0.4c0.7,1.8,1.2,3.6,1.4,5.4c0.1,0.6,0.1,1.2,0.1,1.9C319.7,46.4,310.9,55.2,300,55.2z"/> <path class="st0" d="M334.4,33.4c0-0.1,0-0.3,0-0.4c0-0.6-0.1-1.2-0.2-1.8c0-0.1,0-0.1,0-0.2c-1-7.7-4.5-14.6-9.7-19.8 c0,0-0.1-0.1-0.1-0.1c-5.7-5.7-13-9.1-20.8-9.9c0,0,0,0-0.1,0c-0.5-0.1-1-0.1-1.5-0.1c-0.1,0-0.2,0-0.3,0c-0.6,0-1.2,0-1.8,0 c-0.7,0-1.4,0-2.1,0.1c-0.1,0-0.3,0-0.4,0c-0.6,0-1.2,0.1-1.8,0.2c-0.1,0-0.1,0-0.2,0c-7.7,1-14.6,4.5-19.8,9.7 c0,0-0.1,0.1-0.1,0.1c-5.7,5.7-9.1,13-9.9,20.8c0,0,0,0,0,0.1c-0.1,0.5-0.1,1-0.1,1.5c0,0.1,0,0.2,0,0.3c0,0.6,0,1.2,0,1.8 c0,19,15.5,34.5,34.5,34.5s34.5-15.5,34.5-34.5C334.5,34.8,334.5,34.1,334.4,33.4z M300,65.1c-16.3,0-29.6-13.3-29.6-29.6 c0-0.5,0-1,0-1.5c0-0.1,0-0.1,0-0.2c0-0.4,0.1-0.9,0.1-1.3c0,0,0,0,0,0c1-9.7,6.7-18,14.8-22.6c0.1,0,0.1,0,0.2-0.1 c3.3-1.8,6.9-3,10.6-3.5c0,0,0.1,0,0.1,0c0.5-0.1,1-0.1,1.6-0.2c0.1,0,0.2,0,0.3,0c0.6,0,1.2-0.1,1.8-0.1c0.5,0,1,0,1.5,0 c0.1,0,0.1,0,0.2,0c0.4,0,0.9,0.1,1.3,0.1c0,0,0,0,0,0c9.7,1,18,6.7,22.6,14.8c0,0.1,0,0.1,0.1,0.2c1.8,3.3,3,6.9,3.5,10.6 c0,0,0,0.1,0,0.1c0.1,0.5,0.1,1,0.2,1.6c0,0.1,0,0.2,0,0.3c0,0.6,0.1,1.2,0.1,1.8C329.6,51.8,316.3,65.1,300,65.1z"/></g><g id="arrow"><path class="st0" d="M597.4,63.6l-6.1-4.4c-0.1-0.1-0.2-0.1-0.3-0.2c0,0,0,0-0.1,0c-0.1,0-0.2-0.1-0.3-0.1c-0.1,0-0.1,0-0.2,0 c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.4,0l-4.5,0.8L563.4,44c-0.8-0.6-1.9-0.4-2.5,0.4c-0.3,0.4-0.4,0.9-0.3,1.3 c0.1,0.5,0.3,0.9,0.7,1.2l21.9,15.7l0.8,4.5c0.1,0.5,0.3,0.9,0.7,1.2l6.1,4.4c0.5,0.3,1.1,0.4,1.6,0.2c0.5-0.2,1-0.6,1.1-1.2l1-3.2 l2.7-2c0.5-0.3,0.7-0.9,0.7-1.4C598.2,64.5,597.9,64,597.4,63.6z M592.1,66c-0.3,0.2-0.5,0.5-0.7,0.9l-0.4,1.4l-3.5-2.5L587,63 l2.8-0.5l3.5,2.5L592.1,66z"/><path class="st0" d="M566.4,42.2c-0.2-1-1.1-1.6-2-1.5l-5.3,0.9c-0.3,0.1-0.6,0.2-0.9,0.4c0,0,0,0-0.1,0.1c0,0-0.1,0.1-0.1,0.1 c0,0-0.1,0.1-0.1,0.1c0,0-0.1,0.1-0.1,0.1c0,0.1-0.1,0.1-0.1,0.2c0,0,0,0.1,0,0.1c0,0.1-0.1,0.1-0.1,0.2c0,0,0,0,0,0 c0,0.2-0.1,0.4,0,0.7l0.9,5.3c0.2,1,1.1,1.6,2,1.5c1-0.2,1.6-1.1,1.5-2l-0.6-3.5l3.5-0.6C565.9,44,566.6,43.1,566.4,42.2z"/></g></svg>');

		toggleElementVisibility();

		if ($(window).width() < 813) {
			moveFooter('100px');
		} else {
			moveFooter('-100px');
		}

		shareTwitter();
		$('.about-icon').css({ 'color': 'white', 'border-color': 'white' });

		ga('send', 'pageview', '/game/outcome/dropout/low-focus');
		ga('send', 'event', 'Game Over', 'Drop Out', 'Low Focus');
		//animate to the next panel
		animatePanel(panelNm, 'down', 0, addCurrent);
	}

	function loadHappinessEnd($panel) {
		//end the game
		var panelNm = 'panel-' + $panel;
		hideToolTips();
		$('#' + panelNm).html(window["app-templates"]["../client/features/templates/endMeters" + currentLanguage + ".html"]);
		$('.meterTitle').html((currentLanguage.length == 0 ? 'Your happiness is gone.' : 'Su felicidad desapareció.'));
		$('.meterMessage').html((currentLanguage.length == 0 ? "Academics come first and frugality is important,<br />but college is a life experience too. Make sure you’re getting<br />more out of it than just a diploma." : "Los estudios son la prioridad y es importante la austeridad, pero la universidad también es una experiencia de vida. Hay que sacarle más beneficios que solo el diploma."));
		$('.meterIcon').addClass('happyIcon').html('<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><circle id="head" style="fill:none;stroke:#64BC43;stroke-width:8;stroke-miterlimit:10;" cx="50" cy="50" r="45"/><circle id="eyeL" style="fill:#64BC43;" cx="36" cy="38" r="5"/><circle id="eyeR" style="fill:#64BC43;" cx="62" cy="38" r="5"/><path id="mouth" style="fill:none;stroke:#64BC43;stroke-width:7;stroke-linecap:round;stroke-miterlimit:10;" d="M71,57.6C71,57.6,67.3,71,50,71s-21-13.4-21-13.4"/></svg>');
		$('.learn-more').html((currentLanguage.length == 0 ? "But it’s not just you: Social isolation is one of <a target=\"_blank\" href=\"https://www.ngpf.org/blog/paying-for-college/one-strategy-keep-college-costs-graduate-4-years/\">six key reasons</a> people don’t finish college." : "No le pasa solo a usted: El aislamiento social es uno de los <a target=\"_blank\" href=\"https://www.ngpf.org/blog/paying-for-college/one-strategy-keep-college-costs-graduate-4-years/\">seis motivos claves</a> por los cuales no termina la gente su carrera universitaria."));
		ga('send', 'pageview', '/game/outcome/dropout/low-happiness');
		ga('send', 'event', 'Game Over', 'Drop Out', 'Low Happiness');

		toggleElementVisibility();

		if ($(window).width() < 813) {
			moveFooter('100px');
		} else {
			moveFooter('-100px');
		}
		//animate to next panel
		animatePanel(panelNm, 'down', 0, addCurrent);
		$('.about-icon').css({ 'color': 'white', 'border-color': 'white' });
	}

	function loadConnectionsEnd($panel) {
		//this option does not end the game. lets you finish the game but you can't find a job
		hideToolTips();
		//this is the end
		//hide elements you won't need
		$('#endFrame .endTip').remove();
		var panelNm = 'panel-' + $panel;
		$('#' + panelNm).html(window["app-templates"]["../client/features/templates/endMeters" + currentLanguage + ".html"]);
		$('.meterTitle').html((currentLanguage.length == 0 ? "You can't find a job." : "No puede encontrar un trabajo."));
		$('.meterMessage').html((currentLanguage.length == 0 ? "You graduated from college with low connections and now that you're out in the real world, nobody wants to hire you.": "Se graduó de la universidad con pocas relaciones sociales y ahora se enfrenta a la vida real donde nadie desea emplearlo."));
		$('.meterIcon').addClass('connectionsIcon').html('<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 600 75" style="enable-background:new 0 0 600 75;" xml:space="preserve"><style type="text/css">.st0{fill:#c6e2b6;} .st1{fill:#c6e2b6;stroke:#c6e2b6;stroke-width:0.75;stroke-miterlimit:10;} .st2{clip-path:url(#SVGID_2_);fill:#c6e2b6;}</style><g id="man"><path class="st0" d="M307.4,41.4c-0.1-0.6,0.1-1.2,0.5-1.7c0.4-0.5,1-0.8,1.6-0.8c0.7-0.1,1.3,0.1,1.8,0.5l8.8,7.1l0.1,0.1l-2.9,8 v-1.2c0-3.1-3.2-5.5-3.3-5.6l-0.6-0.5l0.1,0l-5.3-4.3C307.8,42.6,307.5,42,307.4,41.4z"/><path class="st1" d="M317.1,44.5c0.9,0.8,1.9,1.5,2.9,2.3l8.8-7.3c0.9-0.8,2.3-0.6,3.1,0.3c0.8,0.9,0.6,2.3-0.3,3.1l-5.8,4.8l0,0 c0,0-3.3,2.5-3.3,5.8c0,2.8,1.3,5.3,1.7,6.1l6.7,10.3c0.7,1,0.4,2.4-0.7,3c-1,0.7-2.4,0.4-3-0.7l-7-10.8L312.8,73 c-0.4,0.7-1.1,1-1.9,1c-0.4,0-0.8-0.1-1.2-0.3c-1-0.7-1.3-2-0.7-3l7-10.9c0.3-0.7,1.4-3.3,1.4-6.1c0-3.3-2.2-6.1-2.2-6.1v-0.8 c0.3-0.3-1.2,0.3-1.6,0"/><circle class="st0" cx="320" cy="37.4" r="4"/></g><g id="man_1_"><path class="st0" d="M268,41.4c-0.1-0.6,0.1-1.2,0.5-1.7c0.4-0.5,1-0.8,1.6-0.8c0.7-0.1,1.3,0.1,1.8,0.5l8.8,7.1l0.1,0.1l-2.9,8 v-1.2c0-3.1-3.2-5.5-3.3-5.6l-0.6-0.5l0.1,0l-5.3-4.3C268.4,42.6,268.1,42,268,41.4z"/><path class="st1" d="M277.7,44.5c0.9,0.8,1.9,1.5,2.9,2.3l8.8-7.3c0.9-0.8,2.3-0.6,3.1,0.3c0.8,0.9,0.6,2.3-0.3,3.1l-5.8,4.8l0,0 c0,0-3.3,2.5-3.3,5.8c0,2.8,1.3,5.3,1.7,6.1l6.7,10.3c0.7,1,0.4,2.4-0.7,3c-1,0.7-2.4,0.4-3-0.7l-7-10.8L273.5,73 c-0.4,0.7-1.1,1-1.9,1c-0.4,0-0.8-0.1-1.2-0.3c-1-0.7-1.3-2-0.7-3l7-10.9c0.3-0.7,1.4-3.3,1.4-6.1c0-3.3-2.2-6.1-2.2-6.1v-0.8 c0.3-0.3-1.2,0.3-1.6,0"/><circle class="st0" cx="280.6" cy="37.4" r="4"/></g><g id="single"><g><defs><path id="SVGID_1_" d="M318.8,15.3c0-8.4-6.9-15.3-15.3-15.3L298,0c-8.4,0-15.3,6.9-15.3,15.3c0,7.3,5.1,13.4,11.9,14.9l-2.7,4.2 c-0.8,1.2-0.4,2.9,0.8,3.7l0.1,0c1.2,0.8,2.9,0.4,3.7-0.8l3.9-6.1l3.9,6.1c0.8,1.2,2.5,1.6,3.7,0.8l0.1,0 c1.2-0.8,1.6-2.5,0.8-3.7l-2.6-4.1C313.3,29.1,318.8,22.9,318.8,15.3z"/></defs><clipPath id="SVGID_2_"><use xlink:href="#SVGID_1_"  style="overflow:visible;"/></clipPath><path class="st2" d="M303,2.9c-0.8-0.8-1.9-1.2-3-1.2c-2.3,0-4.3,1.9-4.3,4.3c0,2.3,1.9,4.3,4.3,4.3c0.9,0,1.7-0.3,2.4-0.8 c0.2-0.1,0.4-0.3,0.6-0.5c0.8-0.8,1.2-1.9,1.2-3C304.2,4.8,303.8,3.7,303,2.9z"/><path class="st2" d="M331.6,38.7c-0.4-0.5-1-0.8-1.6-0.9c-0.6-0.1-1.3,0.1-1.8,0.5l-8.6,7.2c-11-8.2-15.3-17.4-15.3-17.5 c-0.4-0.7-1.7-3.2-1.7-6c0-3.2,3.2-5.6,3.3-5.7l0.6-0.5l-0.1,0l5.3-4.4c1-0.9,1.2-2.4,0.3-3.4c-0.4-0.5-1-0.8-1.6-0.9 c-0.6-0.1-1.3,0.1-1.8,0.5L300,15l-8.6-7.2c-1-0.9-2.5-0.7-3.4,0.3c-0.9,1-0.7,2.6,0.3,3.4l5.3,4.4l-0.1,0l0.6,0.5 c0,0,3.3,2.5,3.3,5.7c0,2.8-1.1,5.3-1.4,6c-5.7,11.2-14,16.7-15.1,17.4l-8.6-7.2c-1-0.9-2.6-0.7-3.4,0.3c-0.4,0.5-0.6,1.1-0.5,1.8 c0.1,0.6,0.4,1.2,0.9,1.6l5.3,4.4l-0.1,0l0.6,0.5c0,0,3.3,2.5,3.3,5.7c0,2.8-1.1,5.3-1.4,6l-7,10.9c-0.3,0.5-0.5,1.2-0.3,1.8 c0.1,0.6,0.5,1.2,1.1,1.5c0.4,0.2,0.8,0.4,1.3,0.4c0.8,0,1.6-0.4,2-1.1L281,61l6.8,10.5c0.4,0.5,0.9,0.9,1.5,1.1 c0.6,0.1,1.3,0,1.8-0.3c0,0,0,0,0.1-0.1c1.1-0.7,1.4-2.2,0.6-3.3l-6.7-10.3c-0.4-0.7-1.7-3.2-1.7-6c0-3.2,3.2-5.6,3.3-5.7l0.1-0.1 c1-0.7,6.9-4.8,13.3-16.3c1,1.8,6,10,13,15.9l-0.1,0l0.7,0.5c0,0,3.3,2.5,3.3,5.7c0,2.8-1.1,5.3-1.4,6l-7,10.9 c-0.7,1.1-0.4,2.6,0.7,3.3c0.4,0.2,0.8,0.4,1.3,0.4c0.8,0,1.6-0.4,2-1.1l7.1-11.1l6.8,10.5c0.4,0.5,0.9,0.9,1.5,1.1 c0.6,0.1,1.3,0,1.8-0.3c0,0,0,0,0.1-0.1c1.1-0.7,1.4-2.2,0.6-3.3l-6.7-10.3c-0.4-0.7-1.7-3.2-1.7-6c0-3.2,3.2-5.6,3.3-5.7l0.6-0.5 l-0.1,0l5.2-4.4c0.5-0.4,0.8-1,0.9-1.6C332.3,39.8,332.1,39.2,331.6,38.7z"/></g></g></svg>');
		$('.learn-more').html((currentLanguage.length == 0 ? "LEARN MORE ABOUT PAYING FOR COLLEGE AT <a target=\"_blank\" href=\"https://www.ngpf.org/curriculum/paying-for-college/\">NGPF.ORG</a>" : "APRENDER MÁS SOBRE CÓMO PAGAR POR LA UNIVERSIDAD EN <a target=\"_blank\" href=\"https://www.ngpf.org/curriculum/paying-for-college/\">NGPF.ORG</a>"));

		toggleElementVisibility();

		if ($(window).width() < 813) {
			$('footer').css('display', 'none');
		} else {
			moveFooter('-100px');
		}

		shareTwitter();
		turnBtnOn();
		$('.about-icon').css({ 'color': 'white', 'border-color': 'white' });
	}

	function loadTemplateOpt(challenge, panelId, templateUrl, templateType, dontAddLabels) {

		var panelNm = '#panel-' + panelId,
			label = challenge['label' + currentLanguage],
			debtAmount;
		$(panelNm).html(templateUrl);
		if (!dontAddLabels) {
			$(panelNm + ' .label').html(label);
		}
		$(panelNm + ' .opt').each(function (i) {
			var challengeOutcomes = challenge.ChallengeOutcomes[i].Outcome['label' + currentLanguage],
				outcomeId = challenge.ChallengeOutcomes[i].outcomeId,
				challengeId = challenge.ChallengeOutcomes[i].challengeId,
				option,
				debtOption,
				$this = $(this);
			$this.attr('data-outcome', outcomeId);
			$this.attr('data-challenge', challengeId);

			if (!dontAddLabels) {
				$this.html(challengeOutcomes);
			}



			if (challenge.showDebtAmount) {
				try {
					//loop through the outcomes to get the debt value
					for (var x = 0, len = challenge.ChallengeOutcomes[i].Outcome.OutcomeValues.length; x < len; x++) {
						var outcomeLabel = challenge.ChallengeOutcomes[i].Outcome.OutcomeValues[x].Value.label;
						if (outcomeLabel == 'Loans') {
							debtAmount = challenge.ChallengeOutcomes[i].Outcome.OutcomeValues[x].amount;
						}
					}
					$this.after(debtAmount ? '<div class="optDebt">$' + debtAmount + '</div>' : '<div class="optDebt">$0</div>');
				} catch (e) {

				}
			}
			debtAmount = null;
		});

		//puts the svg line for the option in the middle of the opt
		if (templateType >= 3 && $(panelNm).find('.down-opt').length > 1) {
			var optFirstWidth = $(panelNm).find('.first .opt').width() + 20,
				optFirstWidth = (optFirstWidth / 2) + 60,
				optLastWidth = $(panelNm).find('.last .opt').width() + 20,
				optLastWidth = (optLastWidth / 2) + 60;
			$(panelNm).find('.first .svg-opt-anim').css({ 'right': optFirstWidth });
			$(panelNm).find('.last .svg-opt-anim').css({ 'left': optLastWidth });
		}
		// turnBtnOn();
	}



	//API CALLS

	var timeoutTime = 10000;

	function getEndScreenShare(type, debt, year) {
		gettingDownloadUrl = true;
		return $.ajax({
			url: '/end-screen-numbers?salary=' + (selectedMajor ? selectedMajor.meanSalary : 0) + '&type=' + type + '&debt=' + debt + '&year=' + (year ? year : false),
			timeout: timeoutTime
		})
	}

	function getSectionChallengesBySectionId(id) {
		return $.ajax({
			dataType: 'json',
			url: '/api/Sections/getSectionChallenges?id=' + id,
			timeout: timeoutTime
		});
	}

	function getSectionChallengesById(id) {
		return $.ajax({
			dataType: 'json',
			url: '/api/Sections/getSectionChallenges?id=' + id,
			timeout: timeoutTime
		});
	}

	function getChallengeById(id) {
		return $.ajax({
			dataType: 'json',
			url: '/api/Challenges/' + id,
			timeout: timeoutTime
		});
	}

	function getSelectedPathsWithColleges($gpa, $extra, $state) {
		return $.ajax({
			dataType: 'json',
			url: '/api/SelectedPaths/getSelectedPathsWithColleges?gpaId=' + $gpa + '&extraCurriculars=%5B' + $extra + '%5D&stateId=' + $state,
			timeout: timeoutTime
		});
	}

	function getSelectedPathSectionsById(id) {
		return $.ajax({
			dataType: 'json',
			url: '/api/SelectedPaths/getSelectedPathSections?id=' + id,
			timeout: timeoutTime
		});
	}

	function getCollegeById(id) {
		return $.ajax({
			dataType: 'json',
			url: '/api/Colleges/' + id,
			timeout: timeoutTime
		});
	}

	function getRandomChallengesInSection(sectionId) {
		return $.ajax({
			dataType: 'json',
			url: 'api/Sections/getSectionRandomChallenges?id=' + sectionId,
			timeout: timeoutTime
		});
	}

	function getSelectedPaths() {
		return $.ajax({
			dataType: 'json',
			url: '/api/SelectedPaths/getSelectedPaths',
			timeout: timeoutTime
		});
	}

	function getMajors() {
		return $.ajax({
			dataType: "json",
			url: '/api/Majors/getMajors',
			timeout: timeoutTime
		});
	}

	function getGpaRanges() {
		return $.ajax({
			dataType: 'json',
			url: '/api/GpaRanges/getGpaRanges',
			timeout: timeoutTime
		});
	}

	function getStates() {
		return $.ajax({
			dataType: 'json',
			url: '/api/States/getStates',
			timeout: timeoutTime
		});
	}

	function getExtracurriculars() {
		return $.ajax({
			dataType: 'json',
			url: '/api/Extracurriculars/getExtracurriculars',
			timeout: timeoutTime
		});
	}

	function getOutcomeChallengeTypes() {
		return $.ajax({
			dataType: 'json',
			url: '/api/OutcomeChallenges/getChallengeTypesFromArray',
			timeout: timeoutTime
		});
	}

	function checkForOutcomeChallenges(outcomeChallengeIds) {
		var hasAllChallenges = true,
			outcomeChallenges = [];
		for (var i = 0, len = outcomeChallengeIds.length; i < len; i++) {
			if (!outcomeChallengesMap.hasOwnProperty(outcomeChallengeIds[i].challengeId + '-' + outcomeChallengeIds[i].outcomeId)) {
				hasAllChallenges = false;
				break;
			}
			outcomeChallenges.push(outcomeChallengesMap[outcomeChallengeIds[i].challengeId + '-' + outcomeChallengeIds[i].outcomeId]);
		}
		if (!hasAllChallenges) {
			return false;
		}
		return outcomeChallenges;
	}

	function createOutcomeChallengesMap(challenges) {
		for (var i = 0, len = challenges.length; i < len; i++) {
			outcomeChallengesMap[challenges[i].challengeId + '-' + challenges[i].outcomeId] = challenges[i];
		}
	}

	function getArrayOfChallengesWithOutcomes(outcomeChallengeIds) {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				var challenges = checkForOutcomeChallenges(outcomeChallengeIds);
				if (!challenges) {
					$.ajax({
						type: 'GET',
						url: '/api/OutcomeChallenges/getChallengesFromArray',
						data: {
							ids: outcomeChallengeIds
						},
						timeout: timeoutTime,
						datatype: 'json',
						success: function (data) {
							try {
								var newChallenges = JSON.parse(data.challenges);
								createOutcomeChallengesMap(newChallenges);
								challenges = checkForOutcomeChallenges(outcomeChallengeIds);
								resolve(challenges);
							} catch (e) {
								reject(e);
							}
						},
						error: function (err) {
							reject(err);
						}
					});
				} else {
					resolve(challenges);
				}
			});
		});
	}

	function submitLog(log, description) {
		return $.ajax({
			type: 'POST',
			url: '/api/Logs',
			data: { createdAt: Date(), log: log, description: description }
		})
	}

	function getChallengeWithOutcomes(challengeId) {
		return $.ajax({
			dataType: 'json',
			url: '/api/Challenges/' + challengeId + '?filter=%7B%22fields%22%3A%5B%22label%22%2C%22randomChallenge%22%2C%22id%22%2C%22gradSchool%22%5D%2C%22where%22%3A%7B%22active%22%3Atrue%7D%2C%22order%22%3A%22id%20ASC%22%2C%22include%22%3A%5B%22ChallengeAnswerType%22%2C%7B%22relation%22%3A%22ChallengeOutcomes%22%2C%22scope%22%3A%7B%22fields%22%3A%5B%22challengeId%22%2C%22outcomeId%22%2C%22order%22%5D%2C%22where%22%3A%7B%22active%22%3Atrue%7D%2C%22order%22%3A%22order%20ASC%22%2C%22include%22%3A%5B%7B%22relation%22%3A%22Outcome%22%2C%22scope%22%3A%7B%22fields%22%3A%5B%22label%22%2C%22message%22%2C%22id%22%5D%2C%22include%22%3A%5B%7B%22relation%22%3A%22OutcomeValues%22%2C%22scope%22%3A%7B%22fields%22%3A%5B%22outcomeId%22%2C%22valueId%22%2C%22amount%22%5D%2C%22order%22%3A%22outcomeId%22%2C%22include%22%3A%5B%7B%22relation%22%3A%22Value%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22active%22%3Atrue%7D%2C%22order%22%3A%22order%20ASC%22%7D%7D%5D%7D%7D%2C%7B%22relation%22%3A%22OutcomeChallenges%22%2C%22scope%22%3A%7B%22fields%22%3A%5B%22outcomeId%22%2C%22challengeId%22%5D%2C%22order%22%3A%22order%20ASC%22%7D%7D%5D%7D%7D%5D%7D%7D%5D%7D',
			timeout: timeoutTime
		});
	}


	function toggleFooter(e, element) {
		e.stopPropagation();
		
		$(element).toggleClass('rotate-btn');
		$('footer').toggleClass('open-footer');
		if ($(window).width() < 813) {
			// $('.overlay').toggleClass('hidden');
			$('.tooltip').remove();
		}
	}

	function toggleElementVisibility() {
		if ($(window).width() < 813) {
			$('[data-template="desktop-only"]').remove();
		} else {
			$('[data-template="mobile-only"]').remove();
		}
	}

})();

(function() {
	'use strict';
    
})();