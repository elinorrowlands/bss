export default function writeTitleCanvas(canvas) {
        const title = document.getElementById("water-ripples-title").querySelector("h1");
        const titleStyle = window.getComputedStyle(title);

        let titleTopPosition = title.offsetTop * this.curtains.pixelRatio;
        // adjust small offset due to font interpretation?
        titleTopPosition += title.clientHeight * this.curtains.pixelRatio * 0.1;

        const planeBoundinRect = this.scenePlane.getBoundingRect();

        const htmlPlaneWidth = planeBoundinRect.width;
        const htmlPlaneHeight = planeBoundinRect.height;

        // set sizes
        canvas.width = htmlPlaneWidth;
        canvas.height = htmlPlaneHeight;
        let context = canvas.getContext("2d");

        context.width = htmlPlaneWidth;
        context.height = htmlPlaneHeight;

        // draw our title with the original style
        context.fillStyle = titleStyle.color;
        context.font = parseFloat(titleStyle.fontWeight) + " " + parseFloat(titleStyle.fontSize) * this.curtains.pixelRatio + "px " + titleStyle.fontFamily;
        context.fontStyle = titleStyle.fontStyle;

        context.textAlign = "center";

        // vertical alignment
        context.textBaseline = "top";
        context.fillText(title.innerText, htmlPlaneWidth / 2, titleTopPosition);

        if(this.scenePlane.textures && this.scenePlane.textures.length > 1) {
            this.scenePlane.textures[1].resize();
            this.scenePlane.textures[1].needUpdate();
        }
    }