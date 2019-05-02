const express=require('express');
const router=express.Router();
const request = require('request');
const cheerio = require('cheerio');


//I am making use of cheerio library here to load the html body from
//medium.com and to extract the relevant info and sending it back to the front end.

router.post('/crawl',(req,response)=>{
    const arrTag=[];
    const arr=[];
    let start_time = new Date().getTime()
    const URL = `https://medium.com/tag/${req.body.tagName}/archive`;


    console.log(URL);
    request(URL, function (err, res, body) {
    if(err) {
		    console.log(err);
	  } else {

		    let $ = cheerio.load(body);

          var tag=$('#container .surface .screenContent .u-foreground .u-paddingLeft20 .u-flex .u-flex0 .js-moreTags .tags .link' ).each(function(){
            var relatedTag=$(this).text();
            arrTag.push(relatedTag);
          });

          var len=$('#container .surface .screenContent .u-foreground .u-paddingLeft20 .u-flex .u-flex1 .js-postStream .streamItem').each(function(){
          var creator=$(this).find('.cardChromeless').find('.postArticle').find('.u-clearfix').find('.postMetaInline').find('.u-flexCenter').find('.postMetaInline ').children().first().text();
          var url=$(this).find('.cardChromeless').find('.postArticle').children().first().next().children().first().attr("href");
          var title1=$(this).find('.cardChromeless').find('.postArticle').children().first().next().children().first().find('.postArticle-content').find('.section').find('.section-content').find('.section-inner').children().first().text();
          var title2=$(this).find('.cardChromeless').find('.postArticle').children().first().next().children().first().find('.postArticle-content').find('.section').find('.section-content').find('.section-inner').find('.graf.graf--h3.graf-after--figure.graf--trailing.graf--title').text();
          var title3=$(this).find('.cardChromeless').find('.postArticle').children().first().next().children().first().find('.postArticle-content').find('.section').find('.section-content').find('.section-inner').find('.graf.graf--h3.graf-after--figure.graf--title').text();
          var title4=$(this).find('.cardChromeless').find('.postArticle').children().first().next().children().first().find('.postArticle-content').find('.section').find('.section-content').find('.section-inner').find('.title').text();
          var duration=$(this).find('.cardChromeless').find('.postArticle').find('.u-clearfix').find('.postMetaInline').find('.u-flexCenter').find('.postMetaInline ').find('.ui-caption.u-fontSize12.u-baseColor--textNormal.u-textColorNormal.js-postMetaInlineSupplemental').find('.readingTime').attr('title');
          var time=$(this).find('.cardChromeless').find('.postArticle').find('.u-clearfix').find('.postMetaInline').find('.u-flexCenter').find('.postMetaInline ').find('.ui-caption.u-fontSize12.u-baseColor--textNormal.u-textColorNormal.js-postMetaInlineSupplemental').children().first().children().first().text();
          var responses=$(this).find('.cardChromeless').find('.postArticle').children().last().children().last().children().first().text();
          var title=(title1+title2+title3+title4);
            const obj={
              title:title,
              creator:creator,
              url:url,
              duration:duration,
              time:time,
              responses:responses
            };
            arr.push(obj);
          });
          time=new Date().getTime() - start_time;
          console.log(time);
          response.send([arr,arrTag,time]);
        }
});
});


module.exports=router;
