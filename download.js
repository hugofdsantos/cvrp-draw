// modify these parameters accordingly!
var url = './drawmap.html';
var     mapID           = 'mymap';
var     outputFilename  = 'mymap.png';

var resourceWait  = 300,
    maxRenderWait = 10000;

var page          = require('webpage').create(),
    count         = 0,
    forcedRenderTimeout,
    renderTimeout;

/*
page.onConsoleMessage = function(msg) {
    system.stderr.writeLine('console: ' + msg);
};
page.onAlert = function(msg) {
  console.log(msg);
};

var good = false;

function _isGood() {
    return good;
}

page.onCallback = function(data) {
  console.log('CALLBACK: ' + JSON.stringify(data));
  // Prints 'CALLBACK: { "hello": "world" }'
  console.log(data);
  var propValue;
for(var propName in data) {
    propValue = data[propName]

    console.log(propName,propValue);
}
  console.log(data.hello);
  good = true;
};
*/

// function to execute map clipping and saving when page has fully loaded
function doRender() {

    console.log("Page has fully loaded");
    console.log('clipping map...'+mapID);

    console.log(document.getElementById(mapID));
    var clipRect = page.evaluate(function(mapID){
        return document.getElementById(mapID).getBoundingClientRect();
        }, mapID);

    page.clipRect = {
        top:    clipRect.top,
        left:   clipRect.left,
        width:  clipRect.width,
        height: clipRect.height
        };

    console.log('rendering image...')
    console.log('top, left, width, height:')
    console.log(clipRect.top)
    console.log(clipRect.left)
    console.log(clipRect.width)
    console.log(clipRect.height)

    page.render(outputFilename);
    phantom.exit();

}

page.onResourceRequested = function (req) {
    count += 1;
    console.log('> ' + req.id + ' - ' + req.url);
    clearTimeout(renderTimeout);
};

page.onResourceReceived = function (res) {
    if (!res.stage || res.stage === 'end') {
        count -= 1;
        console.log(res.id + ' ' + res.status + ' - ' + res.url);
        if (count === 0) {
            renderTimeout = setTimeout(doRender, resourceWait);
        }
    }
};

/*
//**********************************************************************
// function waitfor - Wait until a condition is met
//
// Needed parameters:
//    test: function that returns a value
//    expectedValue: the value of the test function we are waiting for
//    msec: delay between the calls to test
//    callback: function to execute when the condition is met
// Parameters for debugging:
//    count: used to count the loops
//    source: a string to specify an ID, a message, etc
//**********************************************************************
function waitfor(test, expectedValue, msec, count, source, callback) {
    // Check if condition met. If not, re-check later (msec).
    while (test() !== expectedValue) {
        count++;
        setTimeout(function() {
            waitfor(test, expectedValue, msec, count, source, callback);
        }, msec);
        return;
    }
    // Condition finally met. callback() can be executed.
    console.log(source + ': ' + test() + ', expected: ' + expectedValue + ', ' + count + ' loops.');
    callback();
}
*/

page.open(url, function (status) {
    if (status !== "success") {
        console.log('Unable to load url');
        phantom.exit();
    } else {
/*
     console.log('waiting...');
     setTimeout(function(){
       console.log('passou 1 seg!');
     }, 1000);
      waitfor(_isGood, true, 100, 0, 'not used', function() {
          console.log('Will render!');
*/
        forcedRenderTimeout = setTimeout(function () {
            console.log('start render');
            console.log(count);
            doRender();
        }, maxRenderWait);
/*
      });
*/

    }
});
