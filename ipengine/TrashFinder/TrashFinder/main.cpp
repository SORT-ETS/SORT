//#ifdef OS_WINDOWS
//#include <opencv2/core.hpp>
//#else
////linux
//#endif

#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include <iostream>
#include <stdio.h>
#include "ShapeDetector.h"

using namespace cv;

int main(int argc, char* argv[])
{
	if (argc != 2)
	{
		std::cout << " Usage: trashfinder ImageToAnalyse" << std::endl;
		return -1;
	}

	/// Read the image
	IplImage *img = NULL;
	img = cvLoadImage(argv[1], -1);
	//Mat src = imread(argv[1], IMREAD_COLOR);

	/*if (!src.data)
	{
		std::cout << " Image not loaded correctly" << std::endl;
		return -1;
	}*/

	IplImage* processed = cvCloneImage(img);


	std::vector<Vec3f> circles;
	ShapeDetector::DetectCircles(processed, circles, true);

	cvShowImage("Circles found", img);
	waitKey(0);
	cvDestroyWindow("Circles found");


	cvReleaseImage(&img);
	cvReleaseImage(&processed);

	return 0;
}