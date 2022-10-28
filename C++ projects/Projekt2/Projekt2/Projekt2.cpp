#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <fstream>
#include <fstream>
#include <iostream>
#include <sstream>


using namespace std;

void write_to_file(map<string, vector<map<string, float>>> result, string file_name) {
    ofstream o;
    o.open(file_name);

    for (const auto& pair : result) {
        o << pair.first << endl;

        for (const auto& record : pair.second) {

            for (const auto& field : record) {
                o << field.second << " ";
            }
            o << endl;

        }
        o << endl;
    }

    o.close();
}

bool is_number(const string& str)
{
    for (char const& c : str) {
        if (std::isdigit(c) == 0) return false;
    }
    return true;
}

string read_till_term(string raw, size_t& start) {
    string buffer = "";
    size_t i = start;
    for (i = start; i < raw.size(); i++) {
        if (raw[i] == ' ' || raw[i] == '%') {
            start = i + 1;
            return buffer;
        }
        buffer += raw[i];
    }

    start = i;
    return buffer;

}

vector<map<string, float>> parse_data(string file_name) {
    ifstream t(file_name);
    string line;

    std::getline(t, line);

    vector<string> fields;
    string buffer;
    size_t i = 0;

    while ((buffer = read_till_term(line, i)) != "") {
        fields.push_back(buffer);
    }

    vector<map<string, float>> data;
    while (std::getline(t, line)) {

        map<string, float> curr_row;
        string buffer;
        int field_i = 0;
        for (size_t i = 0; i < line.size(); i++) {
            if (line[i] == ' ') {
                curr_row[fields[field_i]] = stof(buffer);
                buffer = "";
                field_i += 1;
                continue;
            }
            buffer += line[i];
        }
        curr_row[fields[field_i]] = stof(buffer);

        data.push_back(curr_row);
    }

    t.close();

    return data;
}

class TreeNode {
public:
    int index;
    string attr;
    int oper;
    float value;

    string on_false = "";
    string on_true = "";
};

enum OperTypes {
    GREATER,
    SMALLER,
};

enum TreeFields {
    INDEX,
    ATTR,
    OPER,
    VALUE,
    INDEX_FALSE,
    INDEX_TRUE,
};

map<int, TreeNode> parse_tree(string file_name) {
    ifstream t(file_name);
    string line;
    map<int, TreeNode> nodes;

    while (std::getline(t, line)) {
        string buffer;
        size_t i = 0;
        size_t iter = 0;

        TreeNode tn;

        while (i < line.length()) {
            buffer = read_till_term(line, i);

            switch (iter) {
            case INDEX:
                tn.index = stoi(buffer);
                break;
            case ATTR:
                tn.attr = buffer;
                break;
            case OPER:
                tn.oper = buffer == ">" ? GREATER : SMALLER;
                break;
            case VALUE:
                tn.value = stof(buffer);
                break;
            case INDEX_FALSE:
                tn.on_false = buffer;
                break;
            case INDEX_TRUE:
                tn.on_true = buffer;
                break;
            default:
                cout << "Undefined field" << endl;
            }

            iter++;
        }
        nodes[tn.index] = tn;
    }

    return nodes;
}

string evaluate(map<string, float>& record, const map<int, TreeNode>& tn_map) {

    auto curr_node = tn_map.at(0);
    string next;

    while (true) {
        float record_value = record[curr_node.attr];
        int oper = curr_node.oper;

        if (oper == SMALLER) {
            next = record_value > curr_node.value ? curr_node.on_true : curr_node.on_false;
        }
        else {
            next = record_value < curr_node.value ? curr_node.on_true : curr_node.on_false;
        }

        if (is_number(next)) {
            curr_node = tn_map.at(stoi(next));
            continue;
        }
        else {
            return next;
        }
    }
}



int main(int argc, char** argv)
{


    string i_file = "data.txt";
    string o_file = "output.txt";
    string t_file = "tree.txt";

    string last = "";
    for (size_t i = 1; i < argc; i++) {
        if (last == "-i") {
            i_file = argv[i];
        }
        else if (last == "-o") {
            o_file = argv[i];
        }
        else if (last == "-t") {
            t_file = argv[i];
        }
        last = argv[i];
    }


    vector<map<string, float>> data;
    map<int, TreeNode> tn_map;

    data = parse_data(i_file);
    tn_map = parse_tree(t_file);

    map <string, vector<map<string, float>>> ordered;

    for (auto& record : data) {
        string result = evaluate(record, tn_map);
        ordered[result].push_back(record);
    }

    write_to_file(ordered, o_file);

    return 0;
}