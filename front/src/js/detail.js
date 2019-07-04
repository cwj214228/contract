/**
 * 合同详情
 * @author zjy 2019.6.1
 */

 /**
 * 合约列表页
 * @author zjy 2019.5.31
 */

var contractTitle = $('#contract-title');  //合同标题
var content = $('#contract-content');   //合同内容
var oldSignature = $('#old-signature');  //显示甲方签名
var signature = $('#signature');  //显示甲方签名
var clearBtn = $('#clear-btn');   //重置签名
var confirmBtn = $('#confirm-btn'); //确认签名
var saveBtn = $('#save-btn'); //保存按钮
var isAgree = $('#isAgree');  //同意按钮
var blank;  //判断空白
var canvasBox = $('#canvas-box'); //画板div
var canvas = document.getElementById('canvas'); //画板

// 加载时调用
$(document).ready(function(){

  //创建一个空画板用于判断画板是否为空
  blank = document.createElement('canvas');
  blank.width = canvas.width;
  blank.height = canvas.height;

  console.log(window.location.href);
  var contractID = window.location.href.split('/')[4];
  console.log(contractID);
  //渲染合同
  $.ajax({
    type: 'get',
    url: '/contract_detail/' + contractID,
    success: function (res) {  //获取服务器返回的合同信息
      console.log(res);
      contractTitle.html(res.data.title);
      content.html(res.data.content);
      oldSignature.attr('src', res.data.signatureUrl_one);
    }
  })
});


//点击签名
signature.click(function(e) {
  e.preventDefault(); //阻止默认行为

  //显示画板
  $('body').css('background-color', '#757575');
  $('body').css('opacity', '.6');
  canvasBox.css('display', 'block');
  canvasBox.css('width', window.innerWidth + 'px');

  //绘画签名
  drawCanvas(canvas);
})

//重置签名
clearBtn.click(function(e) {
  e.preventDefault();
  clearCanvas(canvas);  //清空画板
})

//确认签名
confirmBtn.click(function(e) {
  e.preventDefault(); //阻止默认行为
  //显示签名缩略图
  if (!(canvas.toDataURL() === blank.toDataURL())) {
    signature.attr('src', canvas.toDataURL());
  } else {
    alert('签名为空,将不作保存');
  }

  //隐藏画板
  canvasBox.css('display', 'none');
  $('body').css('background-color', '#fff');
  $('body').css('opacity', '1');
})

//点击保存
saveBtn.click(function(e) {
  e.preventDefault();   //阻止默认行为

  //判断信息是否填写完整
  if (isAgree.is(":checked") && 
      !(canvas.toDataURL() === blank.toDataURL())) {
        var contractID = window.location.href.split('/')[4];
        console.log(contractID);
        //把文件发送给服务器
        $.ajax({
          method: 'post',
          url: '/edit_contract/save_signature_two/',
          data: {   //发送给服务器的信息
            contractID:contractID,
            signature: signature.attr('src')
          },
          success: function(res) {   //接受到服务器的返回信息
            if (res.code===200){
              alert("签署成功！");
              window.location.reload();
            } else {
              alert("签署失败！");
            }
          }
        });

  } else {
    alert('请您完善信息再提交!');
  }
});