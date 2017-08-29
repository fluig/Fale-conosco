<div class="wcm-widget-class super-widget"
	id="faleconoscoObj_${instanceId}"
    data-params="faleconoscoObj.instance({emailTo: '${emailTo!''}', titulo: '${titulo!''}' , visibilityType: '${visibilityType!''}',enviarModeradores: '${enviarModeradores!''}',instanceId: '${instanceId!''}', widgetURI: '${widgetURI!''}', url: '${url!''}', descricao: '${descricao!''}'})">
    
    <div class="form">
    	<form name="formEditFaleConosco">
    		<p>
    			<label class="label-fale-conosco">${i18n.getTranslation('widgetFaleConosco.titulo')}</label>
    			<input type="text" id="inputTituloFaleConosco" size="40" data-inputTituloFaleConosco value="${titulo!''}"/>
    		</p>
    		<p>
    			<label class="label-fale-conosco">${i18n.getTranslation('widgetFaleConosco.descricao')}</label>
    			<input type="text" id="inputDescricaoFaleConosco" size="40" data-inputDescricaoFaleConosco value="${descricao!''}"/>
    		</p>
    		<p>
    			<label  class="label-fale-conosco">${i18n.getTranslation('widgetFaleConosco.email')}</label>
    			<input type="text" id="inputEmailToFaleConosco" size="40" data-inputEmailTo value="${emailTo!''}"/>
    		</p>
    		<p>
    			<label  class="label-fale-conosco">${i18n.getTranslation('widgetFaleConosco.docPubGed')}</label>
    			<input type="text" id="inputNomeImagemFaleConosco" data-inputCodigoImagem size="40" value="${nomeArquivo!''}"/>
    			<input type="hidden" id="inputCodigoImagemFaleConosco" value="${url!''}"/>
    		</p>
    		<p>
    			<label class="label-fale-conosco">${i18n.getTranslation('widgetFaleConosco.tipoVisibilidade.label')}</label>
    			
    			<input type="radio" id="inputVisibilityTypeExpandido" name="visibilityTypeFaleConosco" checked="checked" value="expandido">
    			<label for="inputVisibilityTypeExpandido" class="label-fale-conosco">${i18n.getTranslation('widgetFaleConosco.tipoVisibilidade.expandido')}</label>
    			
                <input type="radio" id="inputVisibilityTypeMinimizado" name="visibilityTypeFaleConosco" value="minimizado">
                <label for="inputVisibilityTypeMinimizado" class="label-fale-conosco">${i18n.getTranslation('widgetFaleConosco.tipoVisibilidade.minimizado')}</label>
    		</p>
    		<p>
    			<input type="button" class="btn-ui btn-action" data-save-fale-conosco value="${i18n.getTranslation('widgetFaleConosco.salvar')}"/>
    		</p>
    	</form>
    </div>
</div>
