'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">dashboard-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-f3f999bf9cc8bea3da2e835b1789f47dabc262d8cb8c1d1a0d58e49bffd7595c996db4d8aed123da16c30ccd5baa703c158a16a097f22310ba0f99fe1b58ebc4"' : 'data-target="#xs-controllers-links-module-AppModule-f3f999bf9cc8bea3da2e835b1789f47dabc262d8cb8c1d1a0d58e49bffd7595c996db4d8aed123da16c30ccd5baa703c158a16a097f22310ba0f99fe1b58ebc4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-f3f999bf9cc8bea3da2e835b1789f47dabc262d8cb8c1d1a0d58e49bffd7595c996db4d8aed123da16c30ccd5baa703c158a16a097f22310ba0f99fe1b58ebc4"' :
                                            'id="xs-controllers-links-module-AppModule-f3f999bf9cc8bea3da2e835b1789f47dabc262d8cb8c1d1a0d58e49bffd7595c996db4d8aed123da16c30ccd5baa703c158a16a097f22310ba0f99fe1b58ebc4"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-f3f999bf9cc8bea3da2e835b1789f47dabc262d8cb8c1d1a0d58e49bffd7595c996db4d8aed123da16c30ccd5baa703c158a16a097f22310ba0f99fe1b58ebc4"' : 'data-target="#xs-injectables-links-module-AppModule-f3f999bf9cc8bea3da2e835b1789f47dabc262d8cb8c1d1a0d58e49bffd7595c996db4d8aed123da16c30ccd5baa703c158a16a097f22310ba0f99fe1b58ebc4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-f3f999bf9cc8bea3da2e835b1789f47dabc262d8cb8c1d1a0d58e49bffd7595c996db4d8aed123da16c30ccd5baa703c158a16a097f22310ba0f99fe1b58ebc4"' :
                                        'id="xs-injectables-links-module-AppModule-f3f999bf9cc8bea3da2e835b1789f47dabc262d8cb8c1d1a0d58e49bffd7595c996db4d8aed123da16c30ccd5baa703c158a16a097f22310ba0f99fe1b58ebc4"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-607c28df16722da48daac91cf7e2b4d2f6580301fa77735f1828627b7e7633a3ae580045c9164832e7f4870167cae6d71573590f0de86907ec34ccbb454657ad"' : 'data-target="#xs-injectables-links-module-AuthModule-607c28df16722da48daac91cf7e2b4d2f6580301fa77735f1828627b7e7633a3ae580045c9164832e7f4870167cae6d71573590f0de86907ec34ccbb454657ad"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-607c28df16722da48daac91cf7e2b4d2f6580301fa77735f1828627b7e7633a3ae580045c9164832e7f4870167cae6d71573590f0de86907ec34ccbb454657ad"' :
                                        'id="xs-injectables-links-module-AuthModule-607c28df16722da48daac91cf7e2b4d2f6580301fa77735f1828627b7e7633a3ae580045c9164832e7f4870167cae6d71573590f0de86907ec34ccbb454657ad"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BasicStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BasicStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/IntranetModule.html" data-type="entity-link" >IntranetModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PrismaModule-b26166f92cfad849b117ab7a0966ae4955fe54c993ba0e2bce18e8660576c78b61e87dfe1d30b6407977f484c8c6f333193368bb31119c8d03443fbbe7bbe7ad"' : 'data-target="#xs-injectables-links-module-PrismaModule-b26166f92cfad849b117ab7a0966ae4955fe54c993ba0e2bce18e8660576c78b61e87dfe1d30b6407977f484c8c6f333193368bb31119c8d03443fbbe7bbe7ad"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-b26166f92cfad849b117ab7a0966ae4955fe54c993ba0e2bce18e8660576c78b61e87dfe1d30b6407977f484c8c6f333193368bb31119c8d03443fbbe7bbe7ad"' :
                                        'id="xs-injectables-links-module-PrismaModule-b26166f92cfad849b117ab7a0966ae4955fe54c993ba0e2bce18e8660576c78b61e87dfe1d30b6407977f484c8c6f333193368bb31119c8d03443fbbe7bbe7ad"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServicesModule.html" data-type="entity-link" >ServicesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ServicesModule-72c213298ef9cbbbf905c05befd139406ca14c5cfc26f69d3eaa4831c3405ae3816fc8b9d966fead5ef315590b0a6b8744f88c64d332003b5b93fee46f340f3e"' : 'data-target="#xs-controllers-links-module-ServicesModule-72c213298ef9cbbbf905c05befd139406ca14c5cfc26f69d3eaa4831c3405ae3816fc8b9d966fead5ef315590b0a6b8744f88c64d332003b5b93fee46f340f3e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ServicesModule-72c213298ef9cbbbf905c05befd139406ca14c5cfc26f69d3eaa4831c3405ae3816fc8b9d966fead5ef315590b0a6b8744f88c64d332003b5b93fee46f340f3e"' :
                                            'id="xs-controllers-links-module-ServicesModule-72c213298ef9cbbbf905c05befd139406ca14c5cfc26f69d3eaa4831c3405ae3816fc8b9d966fead5ef315590b0a6b8744f88c64d332003b5b93fee46f340f3e"' }>
                                            <li class="link">
                                                <a href="controllers/ServicesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ServicesModule-72c213298ef9cbbbf905c05befd139406ca14c5cfc26f69d3eaa4831c3405ae3816fc8b9d966fead5ef315590b0a6b8744f88c64d332003b5b93fee46f340f3e"' : 'data-target="#xs-injectables-links-module-ServicesModule-72c213298ef9cbbbf905c05befd139406ca14c5cfc26f69d3eaa4831c3405ae3816fc8b9d966fead5ef315590b0a6b8744f88c64d332003b5b93fee46f340f3e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ServicesModule-72c213298ef9cbbbf905c05befd139406ca14c5cfc26f69d3eaa4831c3405ae3816fc8b9d966fead5ef315590b0a6b8744f88c64d332003b5b93fee46f340f3e"' :
                                        'id="xs-injectables-links-module-ServicesModule-72c213298ef9cbbbf905c05befd139406ca14c5cfc26f69d3eaa4831c3405ae3816fc8b9d966fead5ef315590b0a6b8744f88c64d332003b5b93fee46f340f3e"' }>
                                        <li class="link">
                                            <a href="injectables/ServicesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-f652c073dbc34282e4309d260bb5092f668eb4837209a2fe1e4d52b869a88c89a9f5149394296898f6c0a5852d1071b92d06a0b4a3812860ca99dde500ea36e5"' : 'data-target="#xs-controllers-links-module-UsersModule-f652c073dbc34282e4309d260bb5092f668eb4837209a2fe1e4d52b869a88c89a9f5149394296898f6c0a5852d1071b92d06a0b4a3812860ca99dde500ea36e5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-f652c073dbc34282e4309d260bb5092f668eb4837209a2fe1e4d52b869a88c89a9f5149394296898f6c0a5852d1071b92d06a0b4a3812860ca99dde500ea36e5"' :
                                            'id="xs-controllers-links-module-UsersModule-f652c073dbc34282e4309d260bb5092f668eb4837209a2fe1e4d52b869a88c89a9f5149394296898f6c0a5852d1071b92d06a0b4a3812860ca99dde500ea36e5"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-f652c073dbc34282e4309d260bb5092f668eb4837209a2fe1e4d52b869a88c89a9f5149394296898f6c0a5852d1071b92d06a0b4a3812860ca99dde500ea36e5"' : 'data-target="#xs-injectables-links-module-UsersModule-f652c073dbc34282e4309d260bb5092f668eb4837209a2fe1e4d52b869a88c89a9f5149394296898f6c0a5852d1071b92d06a0b4a3812860ca99dde500ea36e5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-f652c073dbc34282e4309d260bb5092f668eb4837209a2fe1e4d52b869a88c89a9f5149394296898f6c0a5852d1071b92d06a0b4a3812860ca99dde500ea36e5"' :
                                        'id="xs-injectables-links-module-UsersModule-f652c073dbc34282e4309d260bb5092f668eb4837209a2fe1e4d52b869a88c89a9f5149394296898f6c0a5852d1071b92d06a0b4a3812860ca99dde500ea36e5"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WeatherModule.html" data-type="entity-link" >WeatherModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateServiceDto.html" data-type="entity-link" >CreateServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Service.html" data-type="entity-link" >Service</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateServiceDto.html" data-type="entity-link" >UpdateServiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});