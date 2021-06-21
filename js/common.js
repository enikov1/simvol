function maskPhone(selector, masked = '+7 (___) ___-__-__') {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		// console.log(template);
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
	
}

'user strict';

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substr(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

const button_active_popup = document.querySelectorAll('._js_popup_phone'),
	  popup_phone = document.querySelector('#popup__phone'),
	  popup_close = document.querySelector('.popup__close');

button_active_popup.forEach(e => {
	e.addEventListener('click', (event) => {
		event.preventDefault();

		popup_phone.classList.add('active');
	});
});

popup_close.addEventListener('click', () => {
	popup_phone.classList.remove('active');
});

if(popup_phone) {
	document.addEventListener('click', (e) => {
		const target = e.target,
			  its_popup = target == popup_phone.querySelector('.popup') || popup_phone.querySelector('.popup').contains(target),
			  its_btn_popup = target.classList.contains('_js_popup_phone'),
			  popup_is_active = popup_phone.classList.contains('active');
		// console.log(its_popup);
		if(!its_popup && !its_btn_popup && popup_is_active) {
			popup_phone.classList.remove('active');
		}
	});
}

maskPhone('._js_phone');