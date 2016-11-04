#include<iostream>
#include<cstring>
#include<fstream>

using namespace std;

ofstream fout;
ifstream fin;

struct Book {
	string name;
	bool isbor = 0;
};

Book *book[1000];
int total = 0;


void duru() {
  string line;
  fin.open("dd.txt");
  if(fin.is_open()) // 有该文件  
    {  
        while ( getline(fin, line) ) // line中不包括每行的换行符  
        {   
        
            book[total] = new Book;
            
            //fin>>Books[i].name>>Books[i].isBor - '0';
            book[total]->name = line;
            getline (fin, line);
            book[total]->isbor = line[0] - '0';
            total++;
        }  
    }  
    else // 没有该文件  
    {  
        cout <<"no such file" << endl;  
    }  
    fin.close();
   
}

void shuchu(){
  fout.open("dd.txt");
  for(int i = 0; i < total; i++) {
    
    fout<<book[i]->name<<endl;
    fout<<book[i]->isbor<<endl;
  }
  fout.close();
  
}

void search(string nam) {
	int i = 0;
	for(i = 0 ; i < total ; i++) {
		if (book[i]->name == nam && book[i]->isbor == 0) {
			cout << "本馆有这本书而且没被借走" <<endl; 
			return;
		}
		else if (book[i]->name == nam && book[i]->isbor != 0) {
			cout<<"本馆有这本书但是已经被借走了" <<endl; 
			return;
		}
	}
	cout <<"本馆没有这本书" <<endl;
}

void bor(string nam) {
	for (int i = 0 ; i < total ; i++) {
		if (book[i]->name == nam && book[i]->isbor == 0) {
			cout << "借阅成功！" <<endl;
			book[i]->isbor = 1; 
			return;
		}
		else if (book[i]->name == nam&& book[i]->isbor == 1) {
			cout << "借阅失败！这本书已经被借走了！" <<endl; 
			return;
		}
	}
	cout << "没有找到您要借阅的书籍QAQ" <<endl; 
}

void ret(string nam) {
	for (int i = 0 ; i < total ; i++) {
		if (book[i]->name == nam && book[i]->isbor == 0) {
			cout << "这本书已经在图书馆中，无需归还" <<endl;
			return;
		}
		else if (book[i]->name == nam && book[i]->isbor == 1) {
			cout << "归还成功！感谢借阅！" <<endl;
			book[i]->isbor = 0;
			return;
		}
	}
	cout <<"本图书馆没有这本书，要增加图书请按4" <<endl;
}

void add(string nam) {
	book[total] = new Book;
	book[total]->name = nam;
	book[total]->isbor = 0;
	cout <<"增加成功！" <<endl;
	total++; 
}

void del(string nam) {
	for (int i = 0 ; i < total ; i++) {
		if (book[i]->name == nam) {
			delete book[i];
			for (int j = i ; j < total + 1 ; j++) {
				book[j] = book[j+1];
			}
			total--;
			cout <<"删除成功！" << endl; 
			return;
		}
	}
	cout <<"删除失败！并没有这本书！" <<endl;
}

int main(void) {
	int n = 0;
	string na;
	duru();
	cout <<"请确认您的操作" <<endl;
	cout <<"按1键查询书籍" <<endl;
	cout <<"按2键借阅书籍" <<endl;
	cout <<"按3键归还书籍" <<endl;
	cout <<"按4键增加一本书" <<endl;
	cout <<"按5键删除一本书" <<endl; 
	cout <<"按0退出程序" <<endl;
	while (1) {
		cin >> n;
		if (n == 1) {
	    	cout <<"请输入要查询的书名" <<endl; 
	    	cin >> na;
	    	search(na);
	    }
    	else if (n == 2) {
    		cout <<"请输入要借阅的书名" <<endl;
    		cin >> na;
    		bor(na);
    	}
    	else if (n == 3) {
    		cout <<"请输入要归还的书名" <<endl;
    		cin >> na;
     		ret(na);
    	}
    	else if (n == 4) {
    		cout <<"请输入要增加的书名" <<endl;
			cin >> na;
			add(na);
		}
		else if (n == 5) {
			cout <<"请输入要删除的书名" <<endl;
			cin >> na;
			del(na);
		}
		else if (n == 0) {
			break;
		}
	}
	shuchu();
	return 0;
}


