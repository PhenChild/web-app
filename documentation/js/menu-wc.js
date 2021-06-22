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
                    <a href="index.html" data-type="index-link">CIIFEN documentation</a>
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
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
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
                                <a href="modules/AdminLayoutModule.html" data-type="entity-link">AdminLayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminLayoutModule-4e1f58a33ce19c583d0507304db79c7c"' : 'data-target="#xs-components-links-module-AdminLayoutModule-4e1f58a33ce19c583d0507304db79c7c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminLayoutModule-4e1f58a33ce19c583d0507304db79c7c"' :
                                            'id="xs-components-links-module-AdminLayoutModule-4e1f58a33ce19c583d0507304db79c7c"' }>
                                            <li class="link">
                                                <a href="components/AsignacionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AsignacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EstacionesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EstacionesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormEstacionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormEstacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormUsuarioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormUsuarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormVariableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormVariableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RolesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RolesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsuariosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsuariosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VariablesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VariablesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-65cb99c9385a697dd16ee33b8b7e9cef"' : 'data-target="#xs-components-links-module-AppModule-65cb99c9385a697dd16ee33b8b7e9cef"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-65cb99c9385a697dd16ee33b8b7e9cef"' :
                                            'id="xs-components-links-module-AppModule-65cb99c9385a697dd16ee33b8b7e9cef"' }>
                                            <li class="link">
                                                <a href="components/AdminLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuthLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewerLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewerLayoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthLayoutModule.html" data-type="entity-link">AuthLayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthLayoutModule-15d7cec373b6c584c16560be08bca078"' : 'data-target="#xs-components-links-module-AuthLayoutModule-15d7cec373b6c584c16560be08bca078"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthLayoutModule-15d7cec373b6c584c16560be08bca078"' :
                                            'id="xs-components-links-module-AuthLayoutModule-15d7cec373b6c584c16560be08bca078"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link">ComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentsModule-144e346cfb2ed2761808b40802b69eb5"' : 'data-target="#xs-components-links-module-ComponentsModule-144e346cfb2ed2761808b40802b69eb5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-144e346cfb2ed2761808b40802b69eb5"' :
                                            'id="xs-components-links-module-ComponentsModule-144e346cfb2ed2761808b40802b69eb5"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarViewerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarViewerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ViewerLayoutModule.html" data-type="entity-link">ViewerLayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ViewerLayoutModule-6291e6f0c4622059ba86e453dbb7cc26"' : 'data-target="#xs-components-links-module-ViewerLayoutModule-6291e6f0c4622059ba86e453dbb7cc26"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ViewerLayoutModule-6291e6f0c4622059ba86e453dbb7cc26"' :
                                            'id="xs-components-links-module-ViewerLayoutModule-6291e6f0c4622059ba86e453dbb7cc26"' }>
                                            <li class="link">
                                                <a href="components/RegistrosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegistrosComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                <a href="classes/AccessToken.html" data-type="entity-link">AccessToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/Estacion.html" data-type="entity-link">Estacion</a>
                            </li>
                            <li class="link">
                                <a href="classes/Horario.html" data-type="entity-link">Horario</a>
                            </li>
                            <li class="link">
                                <a href="classes/Observador.html" data-type="entity-link">Observador</a>
                            </li>
                            <li class="link">
                                <a href="classes/Registro.html" data-type="entity-link">Registro</a>
                            </li>
                            <li class="link">
                                <a href="classes/Usuario.html" data-type="entity-link">Usuario</a>
                            </li>
                            <li class="link">
                                <a href="classes/Variable.html" data-type="entity-link">Variable</a>
                            </li>
                            <li class="link">
                                <a href="classes/VariableHora.html" data-type="entity-link">VariableHora</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DbService.html" data-type="entity-link">DbService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormEstacionComponent.html" data-type="entity-link">FormEstacionComponent</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormVariableComponent.html" data-type="entity-link">FormVariableComponent</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/RouteInfo.html" data-type="entity-link">RouteInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouteInfo-1.html" data-type="entity-link">RouteInfo</a>
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
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
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