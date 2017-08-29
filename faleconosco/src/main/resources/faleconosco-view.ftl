<script src="/webdesk/vcXMLRPC.js"></script>
<script src="/faleconosco/resources/js/faleconosco.js"></script>

<div id="faleconoscoObj_${instanceId}" 
	 class="wcm-widget-class super-widget"
	 data-params="faleconoscoObj.instance({emailTo: '${emailTo!''}', titulo: '${titulo!''}' , visibilityType: '${visibilityType!''}',enviarModeradores: '${enviarModeradores!''}',instanceId: '${instanceId!''}', widgetURI: '${widgetURI!''}', url: '${url!''}', descricao: '${descricao!''}'})">
	 
    <!-- Tipo de visualizacao: expandido -->
    <div class="expandido">
    	<#if titulo != '' || descricao != ''>
        <header>
            <h4>${titulo!''}</h4>
            <div class="description">${descricao!''}</div>
        </header>
        </#if>
        
        <form class="form" action="#" method="get">
            <p>
                <label for="inputSubjectFaleConosco">${i18n.getTranslation('widgetFaleConosco.assunto')}</label>
                <input type="text" id="inputSubjectFaleConosco" name="inputSubjectFaleConosco" value="" placeholder="${i18n.getTranslation('widgetFaleConosco.assunto')}">
            </p>
            <p>
                <label for="inputMessageFaleConosco">${i18n.getTranslation('widgetFaleConosco.mensagem')}</label>
                <textarea rows="1" cols="1" id="inputMessageFaleConosco" name="inputMessageFaleConosco"></textarea>
            </p>
            <p>
                <input type="button" data-envia-email class="btn-ui btn-action" id="send" name="send" value="${i18n.getTranslation('widgetFaleConosco.enviar')}">
                
                <span class="loading">${i18n.getTranslation('widgetFaleConosco.loading')}</span>
            </p>
        </form>
    </div>
    
    <!-- Tipo de visualizacao: minimizado -->
    <div class="minimizado" data-minimizado>
        <h4>${titulo!''}</h4>
        <div class="description">${descricao!''}</div>
    </div>
</div>