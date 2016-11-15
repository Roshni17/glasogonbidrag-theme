<!DOCTYPE html>

<#include init />

<html class="${root_css_class}" dir="<@liferay.language key="lang.dir" />" lang="${w3c_language_id}">

<head>
	<title>${the_title} - ${company_name}</title>

	<meta content="initial-scale=1.0, width=device-width" name="viewport" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />

	<#include "${full_templates_path}/theme_js_head.ftl" />

	${theme.include(top_head_include)}
</head>

<body class="${css_class}">

<a href="#main-content" id="skip-to-content"><@liferay.language key="skip-to-content" /></a>

${theme.include(body_top_include)}

<#if is_signed_in>
	<#include "${full_templates_path}/navigation.ftl" />
</#if>


<div class="wrapper-outer push">
	<div class="gb-ajax-mask"></div>
	<#if show_dockbar>
		<div class="dockbar-wrap">
			<@liferay.dockbar />
		</div>
	</#if>

	<div class="container-fluid" id="wrapper">

		<header id="banner" role="banner"></header>

		<div id="content">

			<#if selectable>
				${theme.include(content_include)}
			<#else>
				${portletDisplay.recycle()}

				${portletDisplay.setTitle(the_title)}

				${theme.wrapPortlet("portlet.ftl", content_include)}
			</#if>
		</div>

		<#include "${full_templates_path}/footer.ftl" />

	</div>
</div>

${theme.include(body_bottom_include)}

<#include "${full_templates_path}/theme_js_bottom.ftl" />

${theme.include(bottom_include)}

</body>

</html>
