var request = function(method, event, path, data, callback, object){
    event.preventDefault();
    object.pending.removeClass('hidden');
    $.ajax({
	type: method,
	url: path,
	data: data,
	success: function(data){
	    this.pending.addClass('hidden');
	    callback.bind(this)(data);
	}.bind(object)
    });
};

var post = function(event, path, form, callback, object){
    request('POST', event, path, form.serialize(), callback, object);
};

var delet = function(event, path, data, callback, object){
    request('DELETE', event, path, data, callback, object);
};
