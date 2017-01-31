#pragma once
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include <iostream>
#include <stdio.h>

using namespace cv;

class ShapeDetector
{
public:
	static void DetectCircles(IplImage* srcImage, std::vector<Vec3f> foundCircles, bool drawResults);

private:
	ShapeDetector();
	~ShapeDetector();
};

