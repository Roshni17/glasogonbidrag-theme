<div class="side-panel-wrap">

  <div class="side-panel side-panel-minimized push">
    <div class="side-panel-inner">
      <a href="#navigation" class="navigation-trigger" title="Visa meny (ctrl+m)" data-hotkey="ctrl+m" data-hotkeymethod="click" data-hotkeytitle="Visa huvudmeny" >
        <span>Visa meny</span>
      </a>
    </div>
  </div>

  <div class="side-panel side-panel-maximized">
    <div class="side-panel-inner">

      <div id="heading">
  			<h1 class="site-title">
  				<a class="${logo_css_class}" href="${site_default_url}" title="<@liferay.language_format arguments="${site_name}" key="go-to-x" />">
  					<img alt="${logo_description}" height="${site_logo_height}" src="${site_logo}" width="${site_logo_width}" />
  				</a>

  				<#if show_site_name>
  					<span class="site-name" title="<@liferay.language_format arguments="${site_name}" key="go-to-x" />">
  						${site_name}
  					</span>
  				</#if>
  			</h1>
  		</div>

      <#include "${full_templates_path}/navigation.ftl" />

    </div>
  </div>

</div>
