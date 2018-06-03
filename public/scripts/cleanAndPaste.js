function cleanAndPaste(html){

	// Remove all SPAN tags

	html = html.replace(/<\/?SPAN[^>]*>/gi, "");

	// Remove Class attributes

	html = html.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi, "<$1$3") ;

	// Remove Style attributes

	html = html.replace(/<(\w[^>]*) style="([^"]*)"([^>]*)/gi, "<$1$3") ;

	// Remove Lang attributes

	html = html.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3") ;

	// Remove XML elements and declarations

	html = html.replace(/<\\?\?xml[^>]*>/gi, "") ;

	// Remove Tags with XML namespace declarations: <o:p></o:p>

	html = html.replace(/<\/?\w+:[^>]*>/gi, "") ;

	// Replace the  

	html = html.replace(/ /, "");



	// Transform <P> to <DIV>

	// var re = new RegExp("(<P)([^>]*>.*?)(<\/P>)","gi") ;
	
	// html = html.replace( re, "<div$2</div>") ;

	return html;

}