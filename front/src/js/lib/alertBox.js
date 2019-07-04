/**
 * 弹框
 * @author zjy 2019.6.5
 */
var alertOutbox = $('#alert-outbox');   //弹框
var closeBtn = $('#close-btn');   //关闭按钮
var contractId = $('#contract-id');   //合同id
var copyBtn = $('#copy-btn');   //复制按钮

$('document').ready(function() {

  //关闭弹框
  closeBtn.click(function(e) {
    e.preventDefault();
    alertOutbox.css('display', 'none');
  });

  copyBtn.click(function(e) {
    e.preventDefault();
    contractId.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    alert('复制成功');
  });
});