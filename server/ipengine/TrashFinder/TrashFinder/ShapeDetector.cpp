#include "ShapeDetector.h"


using namespace cv;

void ShapeDetector::DetectCircles(IplImage* srcImage, std::vector<Vec3f> foundCircles, bool drawResults)
{
	Mat mat_img = cvarrToMat(srcImage);
	Mat img_gray;

	//Transform image to gray
	cvtColor(mat_img, img_gray, CV_BGR2GRAY);
	// Create a window for display.
	namedWindow("Image grayscale", WINDOW_AUTOSIZE);
	// Show our image inside it.
	/// Reduce the noise so we avoid false circle detection
	GaussianBlur(img_gray, img_gray, Size(9, 9), 2, 2);

	std::vector<Vec3f> circles;
	imshow("Image grayscale", img_gray);
	//HoughCircles(img_gray, circles, CV_HOUGH_GRADIENT, 1, img_gray.rows / 8, 200, 30, 10, 20);

	cv::HoughCircles(img_gray, circles, CV_HOUGH_GRADIENT, 1, img_gray.rows/4, 200, 30, 0, 0);
	/*
	if (drawResults)
	{
		for (size_t i = 0; i < circles.size(); i++)
		{
			Point center(cvRound(circles[i][0]), cvRound(circles[i][1]));
			int radius = cvRound(circles[i][2]);
			// circle center
			circle(mat_img, center, 3, Scalar(0, 255, 0), -1, 8, 0);
			// circle outline
			circle(mat_img, center, radius, Scalar(0, 0, 255), 3, 8, 0);
		}
	}*/
	//return circles;
}

ShapeDetector::ShapeDetector()
{
}


ShapeDetector::~ShapeDetector()
{
}




