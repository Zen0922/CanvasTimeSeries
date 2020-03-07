
//-----------------------------------------------------------------------------
// CLASS: CanvasTimeSeries
//   
// 
//-----------------------------------------------------------------------------
class CanvasTimeSeries{
    constructor( argTargetCanvas, argCanvasObj, argBasePositionX, argUsePlanSeries ){
        // SystemControl
        const TargetCanvas = Symbol("TargetCanvas");
        const BasePositionX = Symbol("BasePositionX"); 
        const UsePlanSeries = Symbol("UsePlanSeries");            // Default Not Use PlanSeries

        // Display Environment
        const CANVAS_WIDTH = Symbol("CANVAS_WIDTH");
        const CANVAS_HEIGHT = Symbol("CANVAS_HEIGHT");
        
        const BAR_HEIGHT = Symbol("BAR_HEIGHT");
        const BAR_COLOR = Symbol("BAR_COLOR");
        const TIMESCALE_LINECOLOR = Symbol("TIMESCALE_LINECOLOR");

        const BAR_TOP_MARGIN = Symbol("BAR_TOP_MARGIN");

        this[TargetCanvas] = argTargetCanvas;
        this.ctx = argCanvasObj;
        this[BasePositionX] = argBasePositionX;
        if( argUsePlanSeries === true ){
            this[UsePlanSeries] = true;    
        }else{
            this[UsePlanSeries] = false;
        }
        
        // DefaultValue Setting
        this[UsePlanSeries] = 0;
        this[BAR_HEIGHT] = 100;
        this[BAR_COLOR] = "#CCC";
        this[TIMESCALE_LINECOLOR] = "#FFF";
        this[BAR_TOP_MARGIN] = 100;

        // OtherMembers
        this._PLAN_INFO = [];
        this._RESULT_INFO = [];

        // Get Canvas Element Infomation, Target Element Size Adjust
        this[CANVAS_WIDTH] = this[TargetCanvas].clientWidth;
        this[CANVAS_HEIGHT] = this[TargetCanvas].clientHeight;
        this[TargetCanvas].width = this[CANVAS_WIDTH];
        this[TargetCanvas].height = this[CANVAS_HEIGHT];
    }

    ////////////
    // Method //
    ////////////
    
    // Draw Execution
    draw(){
        // BASE BAR DRAW
        this.ctx.beginPath();
        this.ctx.fillStyle = this[BAR_COLOR];
        this.ctx.fillRect( 20, this[BAR_TOP_MARGIN], this[CANVAS_WIDTH] - 40, this[BAR_HEIGHT]);
        this.ctx.closePath();
    }



    //////////////////////
    // Setter or Getter //
    //////////////////////

    // PlanInformation
    addPlanData( argPlanName, argDate ){
        try{
            var tmpDate = new Date( argDate );
            var tmpDateStr = getDateStr("HH:II:SS", argDate);
            var tmpSeconds = tmpDate.getHours() * 3600 + tmpDate.getMinutes() * 60 + tmpDate.getSeconds();
            this._PLAN_INFO[this._PLAN_INFO.length] = Array( tmpDateStr, argPlanName, tmpSeconds );
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    }

    // ResultInformation
    addResultData( argResultName, argResultDate ){
        try{
            var tmpDate = new Date( argResultDate );
            var tmpDateStr = getDateStr("YYYY/MM/DD HH:II:SS", argResultDate );
            var tmpSeconds = tmpDate.getHours() * 3600 + tmpDate.getMinutes() * 60 + tmpDate.getSeconds();
            this._RESULT_INFO[this._RESULT_INFO.length] = Array( tmpDateStr, argResultName, tmpSeconds );
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    }

    // DateString
    //   argFormat: ReplaceWords Example
    //     YYYY -> 2020
    //     MM -> 01
    //     DD -> 01
    //     HH -> 01
    //     II -> 01
    //     SS -> 01
    //   Replace Example -> argFormat YYYY/MM/DD HH:II:SS
    //       Return: 2020/03/12 14:32:56
    getDateStr( argFormat, argDateStr ){
        if( argDate == "" ){
            var tmpDate = new Date();
        }else{
            try{
                var tmpDate = new Date( argDateStr );
            }catch(e){
                console.log(e);
                return "";
            }
        }
        var strYear = tmpDate.getFullYear();
        var strMonth = tmpDate.getMonth() + 1;
        if( strMonth < 10 )strMonth = "0" + strMonth;
        var strDate = tmpDate.getDate();
        if( strDate < 10 )strDate = "0" + strDate;
        var strHour = tmpDate.getHours();
        if( strHour < 10 )strHour = "0" + strHour;
        var strMinute = tmpDate.getDate();
        if( strMinute < 10 )strMinute = "0" + strMinute;
        var strSecond = tmpDate.getDate();
        if( strSecond < 10 )strSecond = "0" + strSecond;

        argFormat = argFormat.replace("YYYY", strYear );
        argFormat = argFormat.replace("MM", strMonth );
        argFormat = argFormat.replace("DD", strDate );
        argFormat = argFormat.replace("HH", strDate );
        argFormat = argFormat.replace("II", strDate );
        argFormat = argFormat.replace("SS", strDate );
        return argFormat;
    }

    // BAR_HEIGHT
    setBarDesign( argHeight, argBarColor ){
        if( argHeight != "" )this[BAR_HEIGHT] = argHeight;
        if( argBarColor != "" )this[BAR_COLOR] = argBarColor;
    } 
    get getBarHeight(){
        return this[BAR_HEIGHT];
    }
}


function testDisplay(){
    var Canvas = document.getElementById("CanvasTimeSeries");
    var ctx = Canvas.getContext('2d');
    var ts = new CanvasTimeSeries( Canvas, ctx, 0, true );
    ts.draw();
}
