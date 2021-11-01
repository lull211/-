const axios = require("axios");
const cheerio = require("cheerio");

//子函数：得到豆瓣的html
async function getMoviesHtml() {
  const resp = await axios.get("https://movie.douban.com/chart");
  return resp.data;
}

//主函数
async function getMovies() {
  const html = await getMoviesHtml();
  const $ = cheerio.load(html);
  const trs = $("tr.item");
  let movies = [];
  for (const item of trs) {
    //分析每一个tr，得到一部电影对象
    var datas = await getData($(item));
    movies.push(datas);
  }
  return movies;
}

//子函数：获取每一部电影的数据
function getData(item) {
  var name = item.find("div.pl2 a").text().replace(/\s/g, "").split("/")[0];
  var imgUrl = item.find("a.nbg img").attr("src");
  var datil = item.find("div.pl2 p.pl").text();
  return {
    name,
    imgUrl,
    datil,
  };
}

//测试函数
async function test() {
  await getMovies();
}

test();

module.exports = getMovies;
