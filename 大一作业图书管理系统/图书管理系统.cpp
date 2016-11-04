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
  if(fin.is_open()) // �и��ļ�  
    {  
        while ( getline(fin, line) ) // line�в�����ÿ�еĻ��з�  
        {   
        
            book[total] = new Book;
            
            //fin>>Books[i].name>>Books[i].isBor - '0';
            book[total]->name = line;
            getline (fin, line);
            book[total]->isbor = line[0] - '0';
            total++;
        }  
    }  
    else // û�и��ļ�  
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
			cout << "�������Ȿ�����û������" <<endl; 
			return;
		}
		else if (book[i]->name == nam && book[i]->isbor != 0) {
			cout<<"�������Ȿ�鵫���Ѿ���������" <<endl; 
			return;
		}
	}
	cout <<"����û���Ȿ��" <<endl;
}

void bor(string nam) {
	for (int i = 0 ; i < total ; i++) {
		if (book[i]->name == nam && book[i]->isbor == 0) {
			cout << "���ĳɹ���" <<endl;
			book[i]->isbor = 1; 
			return;
		}
		else if (book[i]->name == nam&& book[i]->isbor == 1) {
			cout << "����ʧ�ܣ��Ȿ���Ѿ��������ˣ�" <<endl; 
			return;
		}
	}
	cout << "û���ҵ���Ҫ���ĵ��鼮QAQ" <<endl; 
}

void ret(string nam) {
	for (int i = 0 ; i < total ; i++) {
		if (book[i]->name == nam && book[i]->isbor == 0) {
			cout << "�Ȿ���Ѿ���ͼ����У�����黹" <<endl;
			return;
		}
		else if (book[i]->name == nam && book[i]->isbor == 1) {
			cout << "�黹�ɹ�����л���ģ�" <<endl;
			book[i]->isbor = 0;
			return;
		}
	}
	cout <<"��ͼ���û���Ȿ�飬Ҫ����ͼ���밴4" <<endl;
}

void add(string nam) {
	book[total] = new Book;
	book[total]->name = nam;
	book[total]->isbor = 0;
	cout <<"���ӳɹ���" <<endl;
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
			cout <<"ɾ���ɹ���" << endl; 
			return;
		}
	}
	cout <<"ɾ��ʧ�ܣ���û���Ȿ�飡" <<endl;
}

int main(void) {
	int n = 0;
	string na;
	duru();
	cout <<"��ȷ�����Ĳ���" <<endl;
	cout <<"��1����ѯ�鼮" <<endl;
	cout <<"��2�������鼮" <<endl;
	cout <<"��3���黹�鼮" <<endl;
	cout <<"��4������һ����" <<endl;
	cout <<"��5��ɾ��һ����" <<endl; 
	cout <<"��0�˳�����" <<endl;
	while (1) {
		cin >> n;
		if (n == 1) {
	    	cout <<"������Ҫ��ѯ������" <<endl; 
	    	cin >> na;
	    	search(na);
	    }
    	else if (n == 2) {
    		cout <<"������Ҫ���ĵ�����" <<endl;
    		cin >> na;
    		bor(na);
    	}
    	else if (n == 3) {
    		cout <<"������Ҫ�黹������" <<endl;
    		cin >> na;
     		ret(na);
    	}
    	else if (n == 4) {
    		cout <<"������Ҫ���ӵ�����" <<endl;
			cin >> na;
			add(na);
		}
		else if (n == 5) {
			cout <<"������Ҫɾ��������" <<endl;
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


