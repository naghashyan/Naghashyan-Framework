<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="{ngs cmd=get_sass_out_dir}/im-styles.css" type="text/css" rel="stylesheet">
    <title>NGS DEMO</title>
    <meta name="description" content="Simple HTML5 Page layout template with header, footer, sidebar etc.">
    <script type="module" src="{ngs cmd=get_js_out_path}/index.js?{ngs cmd=get_version}"></script>
</head>

<body>
<header>
    <div id="logo"><img src="/logo.png">HTML5&nbsp;Layout</div>
    <nav>
        <ul>
            <li><a href="/">Home</a>
            <li><a href="https://html-css-js.com/">HTML</a>
            <li><a href="https://html-css-js.com/css/code/">CSS</a>
            <li><a href="https://htmlcheatsheet.com/js/">JS</a>
        </ul>
    </nav>
</header>
<section>
    <strong>Demonstration of a simple page layout using HTML5 tags: header, nav, section, main, article, aside, footer, address.</strong>
</section>
<section id="pageContent">
    {nest ns=content}
</section>
<footer>
    <p>&copy; You can copy, edit and publish this template but please leave a link to our website | <a href="https://html5-templates.com/" target="_blank" rel="nofollow">HTML5 Templates</a></p>
    <address>
        Contact: <a href="mailto:me@example.com">Mail me</a>
    </address>
</footer>


</body>

</html>