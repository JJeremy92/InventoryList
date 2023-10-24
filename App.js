import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { DataTable, Searchbar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import data from "./data.json";

const AboutView = ({ text }) => {
  const [showMore, setShowMore] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const handleMouseEnterIn = () => {
    setIsHovered(true);
  };
  const handleMouseEnterOut = () => {
    setIsHovered(false);
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <View style={styles.aboutView}>
      <Text
        style={
          !showMore
            ? {
                flex: 1,
                flexWrap: "wrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                maxWidth: "30ch",
              }
            : styles.aboutText
        }
      >
        {text}
      </Text>
      <TouchableOpacity
        onMouseEnter={handleMouseEnterIn}
        onMouseLeave={handleMouseEnterOut}
        onPress={handleShowMore}
      >
        <Text
          style={[
            styles.viewDetail,
            {
              textDecorationLine: isHovered ? "underline" : "none",
            },
          ]}
        >
          Show {showMore ? "Less" : "More"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const App = () => {
  const [sortDirection, setSortDirection] = React.useState(undefined);
  const [sortedField, setSortedField] = React.useState(undefined);
  const [searchQuery, setSearchQuery] = React.useState("");
  const items = data;
  const handleSort = (field) => {
    if (field === sortedField) {
      // If the same field is clicked, toggle the sort direction
      setSortDirection(
        sortDirection === "ascending" ? "descending" : "ascending"
      );
    } else {
      // If a different field is clicked, set the field and sort direction
      setSortedField(field);
      setSortDirection("ascending");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Investor List</Text>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <DataTable style={styles.dataTable}>
        <DataTable.Header>
          <DataTable.Title
            sortDirection={sortedField === "name" ? sortDirection : undefined}
            onPress={() => handleSort("name")}
          >
            Name
          </DataTable.Title>
          <DataTable.Title
            sortDirection={
              sortedField === "balance" ? sortDirection : undefined
            }
            onPress={() => handleSort("balance")}
          >
            Balance
          </DataTable.Title>
          <DataTable.Title
            sortDirection={sortedField === "email" ? sortDirection : undefined}
            onPress={() => handleSort("email")}
          >
            Email
          </DataTable.Title>
          <DataTable.Title
            sortDirection={sortedField === "age" ? sortDirection : undefined}
            onPress={() => handleSort("age")}
          >
            Age
          </DataTable.Title>
          <DataTable.Title
            sortDirection={sortedField === "about" ? sortDirection : undefined}
            onPress={() => handleShowMore()}
          >
            About
          </DataTable.Title>
        </DataTable.Header>

        {items
          .filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .sort((a, b) => {
            if (sortedField === "name") {
              return sortDirection === "ascending"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
            } else if (sortedField === "balance") {
              return sortDirection === "ascending"
                ? a.balance.localeCompare(b.balance)
                : b.balance.localeCompare(a.balance);
            } else if (sortedField === "email") {
              return sortDirection === "ascending"
                ? a.email.localeCompare(b.email)
                : b.email.localeCompare(a.email);
            } else if (sortedField === "age") {
              return sortDirection === "ascending"
                ? a.age - b.age
                : b.age - a.age;
            } else {
              return 0;
            }
          })
          .map((item) => (
            <DataTable.Row key={item.key}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>{item.balance}</DataTable.Cell>
              <DataTable.Cell>{item.email}</DataTable.Cell>
              <DataTable.Cell>{item.age}</DataTable.Cell>
              <DataTable.Cell>
                <AboutView text={item.about} />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
      </DataTable>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#123668",
    alignItems: "center",
    padding: 20,
  },
  dataTable: {
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff",
  },
  searchBar: {
    marginBottom: 20,
    width: "80%",
  },
  viewDetail: {
    display: "flex",
    justifyContent: "flex-end",
  },
  aboutText: {
    marginTop: 10,
  },
  aboutView: {
    width: "100%",
  },
});

export default App;
