<nav class="" id="navigation" role="navigation">
	<ul aria-label="<@liferay.language key="site-pages" />" role="menubar">

		<#list nav_items as nav_item>
			<#assign nav_item_attr_has_popup = "" />
			<#assign nav_item_attr_selected = "" />
			<#assign nav_item_css_class = "" />

			<#if nav_item.isSelected()>
				<#assign nav_item_attr_has_popup = "aria-haspopup='true'" />
				<#assign nav_item_attr_selected = "aria-selected='true'" />
				<#assign nav_item_css_class = "selected" />
			</#if>

			<#assign nav_item_attr_data_hotkey = "" />
			<#assign nav_item_attr_data_hotkeymethod = "" />
			<#assign nav_item_attr_data_hotkeytitle = "" />

			<#assign dataHotkey = expandoValueLocalService.getData(company_id, "com.liferay.portal.model.Layout", "CUSTOM_FIELDS", "hotkey", nav_item.getLayout().getPlid(), "")  />
			<#assign dataHotkeyMethod = expandoValueLocalService.getData(company_id, "com.liferay.portal.model.Layout", "CUSTOM_FIELDS", "hotkey-method", nav_item.getLayout().getPlid(), "")  />

			<#if dataHotkey?has_content && dataHotkeyMethod?has_content>
				<#assign nav_item_attr_data_hotkey = "data-hotkey='" + dataHotkey + "'" />
				<#assign nav_item_attr_data_hotkeymethod = "data-hotkeymethod='" + dataHotkeyMethod + "'" />
				<#assign nav_item_attr_data_hotkeytitle = "data-hotkeytitle='" + nav_item.getName() + "'" />
			</#if>



			<li ${nav_item_attr_selected} class="${nav_item_css_class}" id="layout_${nav_item.getLayoutId()}" role="presentation">
				<a aria-labelledby="layout_${nav_item.getLayoutId()}" ${nav_item_attr_has_popup} href="${nav_item.getURL()}" ${nav_item.getTarget()} role="menuitem" ${nav_item_attr_data_hotkey} ${nav_item_attr_data_hotkeymethod} ${nav_item_attr_data_hotkeytitle}>
					<span>${nav_item.icon()} ${nav_item.getName()}</span>
				</a>
			</li>
		</#list>

		<#if show_dockbar>
			<li>
				<a class="toggle-dockbar" href="javascript:;">Toggle Dockbar</a>
			</li>
		</#if>

		<#if is_signed_in>
			<li>
				<a href="${sign_out_url}" id="sign-out" rel="nofollow">${sign_out_text}</a>
			</li>
			<li>
				<span>
					Inloggad som: ${user.firstName} ${user.lastName}
				</span>
			</li>
		<#else>
			<li>
				<a href="${sign_in_url}" data-redirect="${is_login_redirect_required?string}" id="sign-in" rel="nofollow">${sign_in_text}</a>
			</li>
		</#if>

	</ul>
</nav>
