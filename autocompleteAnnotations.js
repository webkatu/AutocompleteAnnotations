//脚注同士のリンクや説明を自動補完;
(function autocompleteAnnotations() {

	var range = document.createRange();

	//注釈側の処理;
	(function() {
		//注釈はannotationsというclass属性を持っている;
		var annotations = document.getElementsByClassName('annotations');
		var modelA = document.createElement('a');
		modelA.id = 'annotation';
		modelA.href = '#footnote';
		for(var i = 0; i < annotations.length; i++) {
			var a = modelA.cloneNode(true);
			a.id += i;
			a.href += i;
			//注釈文字をa要素で囲む;
			range.selectNodeContents(annotations[i]);
			range.surroundContents(a);
		}
	})();

	//脚注側の処理;
	(function() {
		//脚注はfootnotesというclass属性を持っている;
		var footnotes = document.getElementsByClassName('footnotes');
		var modelA = document.createElement('a');
		modelA.id = 'footnote';
		modelA.href = '#annotation';
		for(var i = 0; i < footnotes.length; i++) {
			var a = modelA.cloneNode(true);
			a.id += i;
			a.href += i;
			//脚注文字及び注釈の説明をa要素で囲む;
			range.selectNodeContents(footnotes[i]);
			range.surroundContents(a);

			//脚注を指している注釈側のtitle属性に同じ説明を加える;
			var annotation = document.getElementById('annotation' + i);
			annotation.title = a.textContent;
		}
	})();

	range.detach();
})();