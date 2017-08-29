var faleconoscoObj = SuperWidget.extend({
	instanceId: null,
	sociableId: null,
	emailTo: null,
	visibilityType: null,
	titulo: null,
	widgetURI: null,
	tela: null,
	url: null,
	enviarModeradores: null,
	descricao: null,
	
	init: function() {
		var $this = this;
		
		faleconoscoObj.instanceId = this.instanceId;
		faleconoscoObj.emailTo = this.emailTo;
		faleconoscoObj.visibilityType = this.visibilityType;
		faleconoscoObj.titulo = this.titulo;
		faleconoscoObj.widgetURI = this.widgetURI;
		faleconoscoObj.url = this.url;
		faleconoscoObj.enviarModeradores = this.enviarModeradores;
		faleconoscoObj.descricao = this.descricao;
		
		$("input[name=visibilityTypeFaleConosco][value=" + faleconoscoObj.visibilityType + "]").prop('checked', true);
				
		var jqxhr = $.getJSON(WCMAPI.getServerURL()+"/ecm/api/rest/ecm/documentView/content/"+this.url+"/navigation?_=", function(data, textStatus, jqXHR) {
            var url2 = data.phisicalFile;
            $(".expandido header, .minimizado", $this.DOM).css("background-image", 'url("' + url2 + '")');
        });
		
		if (faleconoscoObj.visibilityType == "minimizado") {
			$(".expandido", this.DOM).css('display', 'none');
			$(".minimizado", this.DOM).css('display', 'block');
		}
		else {
			$(".expandido", this.DOM).css('display', 'block');
			$(".minimizado", this.DOM).css('display', 'none');
		}
    },
    
	bindings: {
		local: {
			'envia-email'			: ['click_sendMail'],
			'save-fale-conosco'		: ['click_saveFaleConosco'],
			'minimizado' 			: ['click_openWindow'],
			'inputCodigoImagem'     : ['click_csChooseFile']
		}
	},
	
	/**
	 * Method to save
	 */
	saveFaleConosco: function(element, event) {
		var args = {
			emailTo:        $('#inputEmailToFaleConosco', this.DOM).val(),
			visibilityType: $('input[name="visibilityTypeFaleConosco"]:checked', this.DOM).val(),
			titulo:         $('#inputTituloFaleConosco', this.DOM).val(),
			url:            $('#inputCodigoImagemFaleConosco', this.DOM).val(),
			descricao:      $('#inputDescricaoFaleConosco', this.DOM).val(),
			nomeArquivo:    $('#inputNomeImagemFaleConosco', this.DOM).val()
		};

		var result = WCMSpaceAPI.PageService.UPDATEPREFERENCES({async:false}, this.instanceId, args);	
		
	    if (result) {
	        WCMC.messageInfo(result.message);
	    } 
	    else {
	    	WCMC.messageError("${i18n.getTranslation('widgetFaleConosco.save.error')}");
	    }
	},
	
	openWindow: function() {
		var cfg = {
	        url: faleconoscoObj.widgetURI+"/faleconoscoTela-view.ftl",
		    width: 393,
		    height: 250,
		    maximized: false,
		    title: faleconoscoObj.titulo,
		    customButtons: new Array("${i18n.getTranslation('widgetFaleConosco.enviar')}")
	    };
		faleconoscoObj.tela = WCMC.panel(cfg);
		faleconoscoObj.tela.bind("panel-button-0", this.sendMail);
		$("#spanDescricaoFaleConoscoMinimizado").text(faleconoscoObj.descricao);
	},
	
    sendMail: function() {
    	var $this = this;
    	var $loading = $(".loading", $this.DOM),
    		$send = $("input[name=send]", $this.DOM);
    	
    	var emailTo = faleconoscoObj.emailTo,
			emailSubject = null,
			emailBody = null;
    	
    	$loading.css('display', 'inline').siblings('textarea').css('height', '70px');
    	$send.attr('disabled', true);
    	
		setTimeout(function() {
			if (faleconoscoObj.visibilityType == "minimizado") {
	    		emailSubject = $("#subjectMinimizadoFaleConosco", $this.DOM).val();
	        	emailBody = $("#inputMessageMinimizadoFaleConosco", $this.DOM).val();
			}
	    	else {
	    		emailSubject = $("#inputSubjectFaleConosco", $this.DOM).val();
	        	emailBody = $("#inputMessageFaleConosco", $this.DOM).val();
	    	}
	    	
	    	if (emailSubject == "" || emailBody == "") {
	    		WCMC.messageWarn("${i18n.getTranslation('widgetFaleConosco.mensagens.campos_requeridos')}");
	    		$loading.css('display', 'none');
	    		$send.attr('disabled', false);
	    		return;
	    	}

	    	var options = {
	    		url: "/api/public/alert/customEmailSender",
	    		type: "POST",
	    		async: false,
	    		data: JSON.stringify({
	        		from: WCMAPI.userEmail,	
	        		to: emailTo,
	        		subject: "Fale Conosco - " + emailSubject,  
	        		templateId: "tplFaleConosco",
	        		dialectId: "pt_BR",
	        		param: {emailBody: emailBody, WDK_VirtualDir: WCMAPI.serverURL+"/webdesk", WDK_CompanyId: WCMAPI.organizationId}
	        	}),
	    		
	    		success: function(data) {
	    			$("#inputSubjectMinimizadoFaleConosco", $this.DOM).val("");
	            	$("#inputMessageMinimizadoFaleConosco", $this.DOM).val("");
	            	
	            	$("#inputSubjectFaleConosco", $this.DOM).val("");
	            	$("#inputMessageFaleConosco", $this.DOM).val("");
	            	
	    			WCMC.messageInfo("${i18n.getTranslation('widgetFaleConosco.mensagens.email_enviado')}");
	    		},
	    		
	    		error: function() {
	    			WCMC.messageInfo("${i18n.getTranslation('widgetFaleConosco.mensagens.email_nao_enviado')}");
	    		}
	    	};

	    	var def = new ajaxRequestDefault();
	    	def.type = 'POST';

	    	var config = $.extend(def, options);
	    	$.ajax(config);

	    	$loading.css('display', 'none');
	    	$send.attr('disabled', false);
	    	
	    	if (faleconoscoObj.tela != null) {
	    		faleconoscoObj.tela.close();
	    	}
		}, 1500);    	
	},
	
	/**
	 * Choose Fluig folder
	 */
	csChooseFile: function(el){
		var $this = this;
		
		$this.csEcmThings(function(arquivoDestino, nome) {
			if (arquivoDestino && nome) {
				el.value = nome;
				$("#inputCodigoImagemFaleConosco", $this.DOM).val(arquivoDestino);				
				return;
			}			
		});
	}, 
	
	/**
	 * Open dialog to choose Fluig folder
	 */
	csEcmThings: function(callback) {
		var zoomECM = function() {
			ECM.findDocument = new Object();

			ECM.findDocument.panel = WCMC.panel({
				url: "/ecm_finddocument/finddocument.ftl",
				width: 750,
				height: 600,
				maximized: true,
				title: "${i18n.getTranslation('widgetFaleConosco.selectfolderwindowtitle')}", 
				callBack: function(){
					ECM.findDocument.getDocuments(0,0,false,3);
				},
				customButtons: new Array("${i18n.getTranslation('widgetFaleConosco.selectfolder')}") 
			});

			ECM.findDocument.panel.bind("panel-button-0", function() {
				var pastaDestino, nome;

				if (ECM.findDocument.dataTable.selectedRows.length > 1) {
					WCMC.messageWarn("${i18n.getTranslation('widgetFaleConosco.selectonlyonefolder')}" + ".");
					return;
				}

				pastaDestino = parseInt(ECM.findDocument.dataTable.selectedRows[0]);
				
				console.log( ECM.findDocument.dataTable.selectedRows );

				if (ECM.findDocument.dataTable.selectedRows.length === 0 || pastaDestino === undefined || pastaDestino === NaN || pastaDestino === 0) {
					WCMC.messageWarn("${i18n.getTranslation('widgetFaleConosco.selectfolder')}" + ".");
					return;
				}

				nome = ECM.findDocument.dataTable.getData(pastaDestino).documentDescription;

				ECM.findDocument.load.hide();
				ECM.findDocument.panel.close();
				callback(pastaDestino, nome);
			});

			ECM.findDocument.panel.bind("panel-button-close", function() {
				var pastaDestino = false, nome = false;
				callback(pastaDestino, nome);
			});
		};
		zoomECM.apply();
	} 
});