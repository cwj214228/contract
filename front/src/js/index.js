/**
 * 主页
 * @author zjy 2019.6.1
 */

var createBtn = $('#create-btn');
var searchInput = $('#search-input');
var searchBtn = $('#search-btn');

// $('document').ready(function() {
  //创建合同
  createBtn.click(function (e) {
    e.preventDefault(); //阻止默认行为
    window.location.href = 'edit_contract';
  });
  //搜索合同
  searchBtn.click(function () {
    if (searchInput.val().trim() === '') {
      alert('请输入合同号');
    } else {
      window.location.href = 'detail/'+searchInput.val();
    }
  });
// });


