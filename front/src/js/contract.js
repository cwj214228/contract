/**
 * 合约列表页
 * @author zjy 2019.5.31
 */

var contractTitle = $('#contract-title');  //合同标题
var editor; //文本编辑器
var signature = $('#signature');  //显示签名
var clearBtn = $('#clear-btn');   //重置签名
var confirmBtn = $('#confirm-btn'); //确认签名
var saveBtn = $('#save-btn'); //保存按钮
var isAgree = $('#isAgree');  //同意按钮
var blank;  //判断空白
var canvasBox = $('#canvas-box'); //画板div
var canvas = document.getElementById('canvas'); //画板
var navItem1 = $('#nav-item1');   //合同按钮
var navItem2 = $('#nav-item2');   //合同按钮
var navItem3 = $('#nav-item3');   //合同按钮

// 加载时调用
$(document).ready(function(){
  //创建文本编辑器
  var E = window.wangEditor;
  editor = new E('#contract-content');

  // 自定义菜单配置
  editor.customConfig.menus = [
    'head',
    'bold',
    'underline'
  ];
  editor.create();

  //创建一个空画板用于判断画板是否为空
  blank = document.createElement('canvas');
  blank.width = canvas.width;
  blank.height = canvas.height;
});

//选择合同
navItem1.click(function(e) {
  e.preventDefault();

  //渲染选中
  var str = $(this).attr('class').split('text-primary').join(' ');

  if (str.indexOf('active') === -1) {
    $(this).attr('class', str + ' active text-white');
  }

  navItem2.attr('class', 'nav-link text-primary');
  navItem3.attr('class', 'nav-link text-primary');

  //渲染合同
  selectContract(1, editor, signature);
});

//选择合同
navItem2.click(function(e) {
  e.preventDefault();

  //渲染选中
  var str = $(this).attr('class').split('text-primary').join(' ');

  if (str.indexOf('active') === -1) {
    $(this).attr('class', str + ' active text-white');
  }

  navItem1.attr('class', 'nav-link text-primary');
  navItem3.attr('class', 'nav-link text-primary');

  //渲染合同
  selectContract(2, editor, signature);
});

//选择合同
navItem3.click(function(e) {
  e.preventDefault();

  //渲染选中
  var str = $(this).attr('class').split('text-primary').join(' ');

  if (str.indexOf('active') === -1) {
    $(this).attr('class', str + ' active text-white');
  }

  navItem1.attr('class', 'nav-link text-primary');
  navItem2.attr('class', 'nav-link text-primary');

  //渲染合同
  selectContract(3, editor, signature);
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
});

//重置签名
clearBtn.click(function(e) {
  e.preventDefault();
  clearCanvas(canvas);  //清空画板
});

//确认签名
confirmBtn.click(function(e) {
  e.preventDefault(); //阻止默认行为
  console.log(canvas.toDataURL());
  console.log(blank.toDataURL());
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
});

//点击保存
saveBtn.click(function(e) {
  e.preventDefault();   //阻止默认行为

    //获取编辑区域内容
  var text = editor.txt.text();
  var textVal = text.split('&nbsp;').join('').trim();

  //判断信息是否填写完整
  if (!textVal) {
    alert('不能发布空合同');
  } else if (isAgree.is(":checked") &&
      !(canvas.toDataURL() === blank.toDataURL()))  {
        console.log(contractTitle.text());
        console.log(editor.txt.html());
        var contractId = $('#contract-id');   //合同id
        //把文件发送给服务器
        $.ajax({
          type: 'post',
          url: '/edit_contract/save_contract/',
          // dataType: 'json',
          data: {   //发送给服务器的信息
            title: contractTitle.text(),
            content: editor.txt.html(),
            signature: signature.attr('src')
          },
          success: function(res) {   //接受到服务器的返回信息
            console.log(res);
            console.log('合同的id：'+res.data);
            alert('合同的id：'+res.data);
            document.getElementById("contract-id").setAttribute("value",res.data);
          }
        });

  } else {
    alert('请您完善信息再提交!');
  }
});