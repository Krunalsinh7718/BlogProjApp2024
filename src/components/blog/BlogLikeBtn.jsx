import { useReducer, useRef } from "react";
import "./post.css";


function BlogLikeBtn(props) {
  let angleTools = {
    getAngle: function (t, n) {
      const a = n.x - t.x,
        e = n.y - t.y;
      return Math.atan2(e, a) / Math.PI * 180
    },
    getDistance: function (t, n) {
      const a = t.x - n.x,
        e = t.y - n.y;
      return Math.sqrt(a * a + e * e)
    },
    getAnglePos: function (x, y, angle, distance, fromDistance) {
      const newx = distance * Math.cos(angle * Math.PI / 180);
      const newy = distance * Math.sin(angle * Math.PI / 180);
      const destx = fromDistance * Math.cos(angle * Math.PI / 180);
      const desty = fromDistance * Math.sin(angle * Math.PI / 180);
      return { x: x + newx, y: y + newy, dx: x + newx + destx, dy: y + newy + desty };
    },
    moveOnAngleLine: function (particle, distance, distanceEp) {
      const a = this.getOneFrameDistance(particle, distance);
      particle.sp.x += a.x;
      particle.sp.y += a.y;

      const b = this.getOneFrameDistance(particle, distanceEp);
      particle.sp.dx += b.x;
      particle.sp.dy += b.y;
    },
    moveOnAngle: function (t, n) {
      const a = this.getOneFrameDistance(t, n);
      t.x += a.x, t.y += a.y
    },
    getOneFrameDistance: function (t, n) {
      return { x: n * Math.cos(t.rotation * Math.PI / 180), y: n * Math.sin(t.rotation * Math.PI / 180) }
    }
  };

  function r(a, b, c) {
    return parseFloat((Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(c ? c : 0));
  }

  const [like, dispatch] = useReducer((state, event) => {
    explode1(event);
    return !state;
  }, false);

  function explode1(e) {
    console.log(e);


    //element required position
    const x = e.clientX;
    const y = e.clientY;

    //canvas element
    const canvasEl1 = document.createElement('canvas');
    const ctx1 = canvasEl1.getContext('2d');
    document.body.appendChild(canvasEl1);

    canvasEl1.style.position = 'fixed';
    canvasEl1.style.left = (x - 50) + 'px';
    canvasEl1.style.top = (y - 50) + 'px';
    canvasEl1.height = 100;
    canvasEl1.width = 100;

    //particles
    let particles1 = [];
    function Particle1() {
      return {
        x: canvasEl1.width / 2,
        y: canvasEl1.height / 2,
        rotation: r(0, 360, true),
        speed: 4,
        color: ['#e84118', '#c23616', '#d63031', '#ff7675'][Math.floor(Math.random() * 3) + 1],
        opacity: r(0, 0.5, true),
        radius: 8,
        friction: 0.9,
        yVel: 0,
        gravity: 0
      }
    }

    for (var i = 0; i < 15; i++) {
      particles1.push(Particle1());
    }
    console.log(particles1);
    //render animation
    function render1() {
      ctx1.clearRect(0, 0, 100, 100);
      particles1.forEach(function (e, i) {
        angleTools.moveOnAngle(e, e.speed);
        e.opacity -= 0.01;
        e.speed *= e.friction;
        e.radius *= e.friction;

        e.yVel += e.gravity;
        e.y += e.yVel;

        if (e.opacity < 0) return;
        if (e.radius < 0) return;

        ctx1.beginPath();
        ctx1.globalAlpha = e.opacity;
        ctx1.fillStyle = e.color;
        ctx1.arc(e.x, e.y, e.radius, 0, 2 * Math.PI, false);
        ctx1.fill();
      });
    }
    let animationLoop;
    function renderLoop() {
      animationLoop = requestAnimationFrame(renderLoop);
      render1();
    }

    const animationTimeOut = setTimeout(function () {
      document.body.removeChild(canvasEl1);
      cancelAnimationFrame(animationLoop);
      clearTimeout(animationTimeOut);
    }, 500)

    renderLoop();

  }
  return (
    <>
      <button
        className={`rounded-full bg-black h-10 w-10 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black grid place-items-center hover:bg-blue-600 shadow-xl post-like-btn ${like ? "post-liked" : ""}`}
        title="Edit"
        {...props}
        onClick={dispatch}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height={24}
          width={24}
        >
          <path

            fill="#fff"
            d="M2 9.137C2 14 6.02 16.591 8.962 18.911 10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138c0-4.863-5.5-8.312-10-3.636C7.5.825 2 4.274 2 9.137Z"
          />
        </svg>
      </button>
    </>
  );
}

export default BlogLikeBtn;
