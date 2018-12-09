$(document).ready(function(){
    var sub = $('#sub')
    var activeRow;
    var activeMenu;
    var timer;

    var mouseInSub = false;
    sub.on('mouseenter',function(e){
        mouseInSub = true
    }).on('mouseleave',function(e){
        mouseInSub = false
    });

    var mouseTrack = []

    var moveHandler = function(e){
        mouseTrack.push({
            x: e.pageX,
            y: e.pagey
        })

        if(mouseTrack.length >3){
            mouseTrack.shift()
        }
    }

    $('#test')
    .on('mouseenter',function(e){
        sub.removeClass('none')

        $(document).bind('mousemove',moveHandler)
    })
    .on('mouseleave',function(e){
        sub.addClass('none')

        if(activeRow){
            activeRow.removeClass('active')
            activeRow = null
        }

        if(activeMenu){
            activeMenu.addClass('none')
            activeMenu = null;
        }

        $(document).unbind('mousemove',moveHandler)
    })
    .on('mouseenter' ,'li',function(e){
        if(!activeRow){
            activeRow = $(e.target).addClass('active')
            activeMenu = $('#' + activeRow.data('id'))
            activeMenu.removeClass('none')
            return
        }

        // debounce
        if(timer){
            clearTimeout(timer)
        }

        var currentMousePos = mouseTrack[mouseTrack.length - 1]
        var leftCorner =mouseTrack[mouseTrack.length - 2]

        var delay = needDelay(sub, leftCorner, currentMousePos)

        if(delay){
            timer = setTimeout(function(){
                if(mouseInSub){
                    return
                }
    
                activeRow.removeClass('active')
                activeMenu.addClass('none')
    
                activeRow = $(e.target)
                activeRow.addClass('active')
                activeMenu = $('#' + activeRow.data('id'))
                activeMenu.removeClass('none')
                timer = null
            },300)
    
        }else{
            var prevActiveRow = activeRow
            var prevActiveMenu = activeMenu

            activeRow = $(e.target)
            activeMenu = $('#' + activeRow.data('id'))

            prevActiveRow.removeClass('active')
            prevActiveMenu.addClass('none')

            activeRow.addClass('active')
            activeMenu.removeClass('none')
        }


        
        

    })
})