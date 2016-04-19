<#------ Taglibs -------------------------------------------------->

<#assign liferay_ui=PortalJspTagLibs["/WEB-INF/tld/liferay-ui.tld"]>
<#assign aui=PortalJspTagLibs["/WEB-INF/tld/liferay-aui.tld"]>

<#------ Define services -------------------------------------------------->

<#assign layoutLocalService = serviceLocator.findService("com.liferay.portal.service.LayoutLocalService") />
<#assign layoutSetLocalService = serviceLocator.findService("com.liferay.portal.service.LayoutSetLocalService") />
<#assign userGroupRoleLocalService = serviceLocator.findService("com.liferay.portal.service.UserGroupRoleLocalService") />

<#assign expandoValueLocalService = serviceLocator.findService("com.liferay.portlet.expando.service.ExpandoValueLocalService") />
<#assign journalArticleLocalService = serviceLocator.findService("com.liferay.portlet.journal.service.JournalArticleLocalService") />

<#------ Define variables -------------------------------------------------->

<#assign portal_url_modified = "" />
<#assign modified_logo_tooltip = "" />

<#assign nav_css_class = "" />

<#------ Expando values -------------------------------------------------->

<#------ Theme Settings -------------------------------------------------->

<#------ Dockbar -------------------------------------------------->

<#------ Macros -------------------------------------------------->

<#-- Include an Asset Publisher in theme. attribute: group_id is long, page_plid is long, setting_name is String, portlet_instance_suffix is String -->
<#macro includeAP group_id page_plid archived_setting_name portlet_instance_suffix>
	<#local instanceId = portlet_instance_suffix>
	<#if instanceId?length < 12>
		<#local instanceId = instanceId + "cygateab1234" />
	</#if>
	<#local instanceId = instanceId?substring(0, 12) />
	<#local portletInstanceId = "101_INSTANCE_" + instanceId />

	<#local settingsXml = getArchivedPortletPreferencesXml(group_id, archived_setting_name, "101")! />

	<#if settingsXml?has_content>
		<#-- Update portlet preferences for portlet instance on the given plid -->
		<#assign void = portletPreferencesLocalService.updatePreferences(0, 3, page_plid, portletInstanceId, settingsXml) />

		${freeMarkerPortletPreferences.reset()}
		${freeMarkerPortletPreferences.setValue("portletSetupShowBorders","false")}
		${theme.runtime(portletInstanceId, "", freeMarkerPortletPreferences)}
		${freeMarkerPortletPreferences.reset()}

	</#if>
</#macro>

<#-- Include Web Content Display portlet in theme. attribute: group_id is long, article_id is String-->

<#macro includeWCD group_id article_id>
	<#if article_id != "">

		<#local portlet_instance_suffix = "vgrintra" />
		<#local instance_id = "wcd" + article_id + portlet_instance_suffix />
		<#local instance_id = instance_id?substring(0, 12) />
		<#local portlet_id = "56_INSTANCE_" + instance_id />

		${freeMarkerPortletPreferences.reset()}

		${freeMarkerPortletPreferences.setValue("portletSetupShowBorders","false")}
		${freeMarkerPortletPreferences.setValue("groupId", group_id?c)}
		${freeMarkerPortletPreferences.setValue("articleId", article_id)}

		${theme.runtime(portlet_id, "", freeMarkerPortletPreferences)}
		${freeMarkerPortletPreferences.reset()}
	<#else>
		&nbsp;
	</#if>
</#macro>
