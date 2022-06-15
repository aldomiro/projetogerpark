const Morador = require('../models/MoradorModel');

exports.index = (req, res) =>{
	res.render('morador');
};

exports.register = (req, res) => {
	try {
		const morador = new Morador(req.body);
	await morador.register();
	
	if(morador.errors.length > 0) {
		req.flash('errors', morador.errors);
    req.session.save(() => res.redirect('back'));
    return;
	}

	req.flash('success', 'Morador registrado com sucesso.');
	req.session.save(() => res.redirect(`/morador/index/${morador.morador._id}`));
	return;
	} catch(e){
		console.log(e);
	return	res.render('404');
	}	
};
