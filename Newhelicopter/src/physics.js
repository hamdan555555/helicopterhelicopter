class Helicopter {
  constructor(length, width, mass, CD, CA, CL, angleOfAttack, rpmMain, maxAngleOfAttack, rpmTail, mainBladeArea, tailBladeArea, mainWingWidth, mainWingLength, tailWingWidth, tailWingLength) {
    this.length = length;
    this.width = width;
    this.mass = mass;
    this.CD = CD;
    this.CA = CA;
    this.CL = CL;
    this.angleOfAttack = angleOfAttack;
    this.rpmMain = rpmMain;
    this.maxAngleOfAttack = maxAngleOfAttack;
    this.rpmTail = rpmTail;
    this.mainBladeArea = mainBladeArea;
    this.tailBladeArea = tailBladeArea;
    this.mainWingWidth = mainWingWidth;
    this.mainWingLength = mainWingLength;
    this.tailWingWidth = tailWingWidth;
    this.tailWingLength = tailWingLength;
  }


  startEngine() {
    // كود تشغيل المحرك
    console.log("Starting engine...");
  }
  

  stopEngine() {
    console.log("Stopping engine...");
    // كود اطفاء المحرك
  }

  takeOff() {
    // كود الاقلاع
    console.log("Initiating takeoff...");
    let rpm = 0;
    let angle = 0;
    while (rpm < this.rpmMain && angle < this.maxAngleOfAttack) {
      rpm += 10;
      angle += 1;
      console.log(`Increasing main rotor RPM to ${rpm} and angle of attack to ${angle} degrees...`);
    }
  }

  land() {
    // كود الهبوط
    console.log("Initiating landing...");
    let angle = this.angleOfAttack;
    while (angle > 0) {
      angle -= 1;
      console.log(`Decreasing angle of attack to ${angle} degrees...`);
    }
  }
/*
  calculateTotalForces() {
    // حساب القوى الكلية
    let gravity = this.mass * 9.81;
    let lift = this.CL * 0.5 * this.mainBladeArea * Math.pow(this.rpmMain, 2) * Math.sin(this.angleOfAttack);
    let drag = this.CD * 0.5 * this.mainBladeArea * Math.pow(this.rpmMain, 2);
    let thrust = (this.mass * 9.81) / Math.cos(this.angleOfAttack);
    let totalForces = gravity - lift - drag - thrust;
    console.log(`Total forces: ${totalForces} N`);
  }

  calculateTotalTorques() {
    // حساب العزوم
    let mainRotorTorque = this.CL * 0.5 * this.mainBladeArea * Math.pow(this.rpmMain, 2);
    let tailRotorTorque = this.CA * 0.5 * this.tailBladeArea * Math.pow(this.rpmTail, 2);
    let totalTorques = mainRotorTorque - tailRotorTorque;
    console.log(`Total torques: ${totalTorques} Nm`);
  }

  acceleration() {
    // تسارع
    let totalForces = this.calculateTotalForces();
    let acceleration = totalForces / this.mass;
    console.log(`Acceleration: ${acceleration} m/s^2`);
  }

  velocity() {
    // سرعة
    let acceleration = this.acceleration();
    let velocity = 0;
    let time = 0.1;
    while (time <= 10) {
      velocity += acceleration * time;
      console.log(`Velocity after ${time} seconds: ${velocity} m/s`);
      time += 0.1;
    }
  }

  distance() {
    //مسافة 
    let velocity = this.velocity();
    let distance = 0;
    let time = 0.1;
    while (time <= 10) {
      distance += velocity * time;
      console.log(`Distance after ${time} seconds: ${distance} m`);
      time += 0.1;
    }
  }

  angularAcceleration() {
    // تسارع زاوي
    let totalTorques = this.calculateTotalTorques();
    let inertia = (1/12) * this.mass * (Math.pow(this.length, 2) + Math.pow(this.width, 2));
    let angularAcceleration = totalTorques / inertia;
    console.log(`Angular acceleration: ${angularAcceleration} rad/s^2`);
  }

  angularVelocity() {
    // سرعة زاوية
    let angularAcceleration = this.angularAcceleration();
    let angularVelocity = 0;
    let time = 0.1;
    while (time <= 10) {
      angularVelocity += angularAcceleration * time;
      console.log(`Angular velocity after ${time} seconds: ${angularVelocity} rad/s`);
      time += 0.1;
    }
  }

  angularDistance() {
    // مسافة زاوية
    let angularVelocity = this.angularVelocity();
    let angularDistance = 0;
    let time = 0.1;
    while (time <= 10) {
      angularDistance += angularVelocity * time;
      console.log(`Angular distance after ${time} seconds: ${angularDistance} rad`);
      time += 0.1;
    }
  }
  */
}



class HelicopterForces {
  constructor(T0, g, R1, Temp, height, VWind, MainWingWidth, MainWingLength, TailWingLength, TailWingWidth, M, L, HelicopterMass) {
    this.T0 = T0; // درجة الحرارة القياسية
    this.g = g; // ثابت الجاذبية الأرضية
    this.R1 = R1; // ثابت الغازات العام
    this.Temp = Temp; // درجة الحرارة
    this.height = height; // ارتفاع الطائرة
    this.VWind = VWind; // سرعة الرياح النسبية
    this.MainWingWidth = MainWingWidth; // عرض الشفرة الأمامية
    this.MainWingLength = MainWingLength; // طول الشفرة الأمامية
    this.TailWingLength = TailWingLength; // طول الشفرة الخلفية
    this.TailWingWidth = TailWingWidth; // عرض الشفرة الخلفية
    this.M = M; // كتلة الهواء المولية
    this.L = L; // معدل انخفاض درجة الحرارة
    this.HelicopterMass = HelicopterMass; // كتلة المروحية
    this.rpmMain = rpmMain;
    this.CD = CD;
    this.CA = CA;
    this.CL = CL;
    this.CL2 = CL2;
  }

  // تابع حساب الضغط الجوي
  airPressure() {
    const p0 = 101325; // الضغط الجوي الأساسي بالباسكال
    const l = this.L; // معدل انخفاض درجة الحرارة
    const g = this.g; // ثابت الجاذبية الأرضية
    const M = this.M; // كتلة الهواء المولية
    const h = this.height; // ارتفاع الطائرة
    const p = p0 * Math.pow(1 - (l * h / this.T0), ((-1 * g * M) / (l * this.R1))); // حساب الضغط الجوي
    return p;
  }

  // تابع حساب كثافة الهواء
  airDensity() {
    const P = this.airPressure(); // الضغط الجوي بالباسكال
    const R = 287; // ثابت الغازات العامة بالجول/مول.كلفن
    const T = this.Temp; // درجة الحرارة بالكلفن
    const ρ = P / (R * T); // حساب كثافة الهواء
    return ρ;
  }

  // تابع حساب مساحة الشفرة الأمامية
  mainWingSpace() {
    const width = this.MainWingWidth; // عرض الشفرة الأمامية
    const length = this.MainWingLength; // طول الشفرة الأمامية
    const area = width * length; // حساب مساحة الشفرة الأمامية
    return area;
  }

  // تابع حساب مساحة الشفرة الخلفية
  tailWingSpace() {
    const width = this.TailWingWidth; // عرض الشفرة الخلفية
    const length = this.TailWingLength; // طول الشفرة الخلفية
    const area = width * length; // حساب مساحة الشفرة الخلفية
    return area;
  }

  // تابع حساب السرعة الزاوية
  angularVelocity() {
    const rpm = this.rpmMain; // سرعة دوران المحرك الرئيسي
    const ω = rpm / (60 * 2 * Math.PI); // حساب السرعة الزاوية
    return ω;
  }
/*
   //حساب سرعة الرياح النسبية 
  calculateRelativeWindSpeed(windSpeed, planeSpeed) {
    let relativeWindSpeed = windSpeed - planeSpeed;
    return relativeWindSpeed;
  }
*/

  // تابع حساب قوة الرفع على الشفرة الامامية
  liftForce() {
    const ρ = this.airDensity(); // حساب كثافة الهواء 
    const L2 = 0.5 * ρ * Math.pow(his.angularVelocity, 2) * this.MainWingLength * this.CL * Math.pow(this.MainWingWidth, 3)/3 ; // حساب قوة الرفع على الشفرة الأمامية باستخدام السرعة الزاوية ونصف القطر وكثافة الهواء ومعامل الرفع
    return L;
  }

  // تابع حساب قوة الجر
  dragForce() {
    const ρ = this.airDensity(); // حساب كثافة الهواء 
    const D = 0.5 * ρ * Math.pow(his.angularVelocity, 2) * this.MainWingLength * this.CD * Math.pow(this.MainWingWidth, 4)/4 ; 
    return D;
  }

  // تابع حساب قوة الرفع على الشفرة الخلفية
  tailWingLiftForce() {
    const ρ = this.airDensity(); // حساب كثافة الهواء 
    const L = 0.5 * ρ * Math.pow(his.angularVelocity, 2) * this.TailWingLength * this.CL2 * Math.pow(this.TailWingWidth, 3)/3 ; 
    return L;
  }

  // تابع حساب القوة الوزنية على المروحية
  weightForce() {
    const g = this.g; // ثابت الجاذبية الأرضية
    const m = this.HelicopterMass; // كتلة المروحية
    const W = m * g; // حساب القوة الوزنية على المروحية
    return W;
  }

  // تابع حساب مجموع القوى الفيزيائية بدون مقاومة الهواء
  totalForce() {
    const L1 = this.liftForce(); // قوة الرفع على الشفرة الأمامية
    const L2 = this.tailWingLiftForce(); // قوة الرفع على الشفرة الخلفية
    const W = this.weightForce(); // القوة الوزنية على المروحية
    const F_total = F - L1 - L2 - W; // مجموع القوى الفيزيائية
    return F_total;
  }

    // تسارع
  acceleration() {
    let totalForces = this.totalForce();
    let acceleration = totalForces / this.mass;
    console.log(`Acceleration: ${acceleration} m/s^2`);
    return acceleration;
  }

    // سرعة 
    velocity() {
      let acceleration = this.acceleration();
      let time = 5; // تحديد الوقت الذي نريد حساب السرعة اللحظية فيه
      let initialVelocity = 0; // السرعة الأولية
      let instantaneousVelocity = initialVelocity + (acceleration * time); // السرعة اللحظية
      console.log(`Instantaneous Velocity at ${time} seconds: ${instantaneousVelocity} m/s`);
      return instantaneousVelocity;
    }


  //مقاومة الهواء
  airResistance() {
    const ρ = this.airDensity(); // حساب كثافة الهواء
    const v = this.velocity(); // سرعة الهواء المؤثرة على المروحية
    const A = this.rotorArea(); // مساحة الشفرة الأمامية للمروحية
    const Cd = this.dragCoefficient(); // معامل المقاومة الهوائية
    const R = 0.5 * rho * v * v * A * Cd; // حساب مقاومة الهواء
    return R;
  }

}





const myHelicopter = new Helicopter(
  15, // length
  5, // width
  5000, // mass
  0.05, // CD
  0.1, // CA
  0.7, // CL
  5, // angleOfAttack
  3000, // rpmMain
  10, // maxAngleOfAttack
  2000, // rpmTail
  10, // mainBladeArea
  5, // tailBladeArea
  20, // mainWingWidth
  30, // mainWingLength
  5, // tailWingWidth
  10 // tailWingLength
);

