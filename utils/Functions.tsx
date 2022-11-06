function generateLineRoute(startPoint: any, endPoint: any, steps: number) {
  let route = [];
  let latDiff = endPoint.latitude - startPoint.latitude ;
  let longDiff = endPoint.longitude - startPoint.longitude;
  let latStep = latDiff / steps;
  let longStep = longDiff / steps;

  for (let i = 1; i <= steps; ++i) {
    route.push({
      latitude: startPoint.latitude + i * latStep,
      longitude: startPoint.longitude + i * longStep,
    });
  }

  return route;
}

function generateFullRoute(points: Array<any>) {
  let fullRoute = [];
  let subRoute = [];

  for (let i = 0; i < points.length - 1; ++i) {
    subRoute = generateLineRoute(points[i], points[i + 1], 10);
    fullRoute.push(...subRoute);
  }
  return fullRoute;
}

export { generateLineRoute, generateFullRoute };
