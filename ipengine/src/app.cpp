#include <iostream>
#include <fstream>

using namespace std;

int main(int argc, char *argv[])
{
	ofstream logFile("/usr/src/ipengine/log.txt", ios::app);
	logFile << "OpenCV application run\n";
	for(int count = 0; count < argc; count++) {
		logFile << " argv[ " << count  << "]  " << argv[count] << "\n";
	}
	logFile.close();

	return 0;
}
