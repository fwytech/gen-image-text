let W, Counter, Angle;

function setup() {
  createCanvas(W=720, W);
  colorMode(HSB, 360, 100, 100, 100);
  fill(0, 0, 100, 20); // 白色半透明填充
  Counter = 0;
}

function draw() {
  Counter++;
  rect(0, 0, W, W);
  Angle = (PI + sin(Counter * 0.02)) / 7;
  
  // 重置默认线条样式
  strokeWeight(1);
  stroke(0, 0, 100, 100); // 白色线条
  
  for(let j = 0; j < TWO_PI; j += TWO_PI / 8) {
    Tree(7, W/2, W/2, j, 45);
  }
  copy(10, 10, W-20, W-20, 0, 0, W, W);
}

function Tree(step, x, y, rad, lengs) {
  if(step > 0) {
    let inf = 20 - step; // influence of noise
    let n = noise((x + Counter) / W, (y - Counter) / W) * inf;
    
    // 根据递归深度和角度设置颜色
    let hue = map(step, 1, 7, 0, 360) + map(rad, 0, TWO_PI, -30, 30);
    let saturation = map(step, 1, 7, 30, 100);
    let brightness = map(step, 1, 7, 100, 70);
    
    // 添加一些随机性
    hue = (hue + random(-10, 10)) % 360;
    
    stroke(hue, saturation, brightness, 90);
    strokeWeight(step * 0.5); // 根据递归深度设置线条粗细
    
    line(x, y, x += cos(rad) * lengs + cos(n) * inf, y += sin(rad) * lengs + sin(n) * inf);
    step--;
    lengs *= 0.9;
    Tree(step, x, y, rad + Angle, lengs);
    Tree(step, x, y, rad - Angle, lengs);
  }
}