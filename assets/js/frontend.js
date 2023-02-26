jQuery(document).ready(function($) {

	$("body").on('change', "input[name='request_type']:checked", function() {
			var value = $(this).val();
			if (value == 'praise_report') {
				$('#prayer_title_row').parent().parent().addClass('hiderow');
			} else {
				$('#prayer_title_row').parent().parent().removeClass('hiderow');

			}
    });

    if($("input[name='request_type']:checked").val() == 'praise_report') {
		$('#prayer_title_row').parent().parent().addClass('hiderow');
	} else {
		$('#prayer_title_row').parent().parent().removeClass('hiderow');
	}

});

function do_pray(pray_id,user_ip){
	jQuery.ajax({
				type: "POST",
				url: wpe_js_lang.ajax_url,
				data: {
					action: 'wpe_ajax_call',
					'prayer_id': pray_id,
					'user_ip': user_ip,
					'operation': 'wpe_do_pray'
				},
				beforeSend: function() {
					jQuery('#do_pray_'+pray_id).attr('disabled','disabled');
					jQuery('#do_pray_'+pray_id).addClass('prayed');
					jQuery('#do_pray_'+pray_id).val(wpe_js_lang.loading_text);jQuery('#do_pray_'+pray_id).val(wpe_js_lang.pray1_text);
				},
				success: function(data) {
					//console.log(data);
					if(data=="success"){
						var count = jQuery('#prayer_count'+pray_id).html();
						//alert('#prayer_count_'+pray_id);
						 count = parseInt(count) + 1;
						jQuery('#prayer_count'+pray_id).html(count);
						 jQuery('#do_pray_'+pray_id)
							.val(wpe_js_lang.prayed_text)
							//.removeAttr('onclick')
							//.removeAttr('disabled');
						.prop("disabled", false);


					} else {
						jQuery('#do_pray_'+pray_id).val(wpe_js_lang.prayed_text);

					}


					setTimeout(function(){
						jQuery('#do_pray_'+pray_id).val(wpe_js_lang.pray1_text)
							.removeClass('prayed')
							//.removeAttr('disabled');
							.prop("disabled", false);
					},parseInt(wpe_js_lang.pray_time_interval)*1000);
				}

			});

}

 function refreshCaptcha(){
	var img = document.images['captchaimg'];
	img.src = img.src.substring(0,img.src.lastIndexOf("?"))+"?rand="+Math.random()*1000;
	}

	// function recaptchaCallback() {
	//   $('#hiddenRecaptcha').valid();
	// };
