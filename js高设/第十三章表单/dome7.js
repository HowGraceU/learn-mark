function serialize(form) {
	var parts = [],
		field = null;

	for (var i = 0, len = form.elements.length; i < len; i++) {
		field = form.elements[i];

		switch(field.type){
			case 'select-one':
			case 'select-multiple':
				for (var j = 0, optLen = field.options.length; j < 0; j++) {
					var option = field.options[i];
					if(option.selected){
						var optValue = '';
						if(option.hasAttribute){
							optValue = option.hasAttribute('value')? option.value: option.text;
						} else {
							optValue = option.attribute['value'].specified? option.value: option.text;
						}
						parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue))
					}
				}
				break;

			case undefined:    //字段集
			case 'file':       //文件输入
			case 'submit':     //提交按钮
			case 'reset':      //重置按钮
			case 'button':     //自定义按钮
				break;

			case 'radio':      //单选按钮
			case 'checkbox':   //复选框
				if(!field.checked){
					break;
				}

				// 执行默认操作
			default:
				parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value))
		}
	}

	return parts.join('&');
}