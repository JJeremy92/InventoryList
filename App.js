import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import data from "./data.json";

const ListItem = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const color = item.isActive ? "#ffffff" : "#929292";

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
    <View style={[styles.listItem, index === data.length - 1 && styles.lastItem]}>
      <View style={styles.inventoryField}>
        <Text style={[styles.infoLabel, { color }]}>Name:</Text>
        <Text style={[styles.infoText, { color }]}>{item.name}</Text>
      </View>
      <View style={styles.inventoryField}>
        <Text style={[styles.infoLabel, { color }]}>Balance:</Text>
        <Text style={[styles.infoText, { color }]}>{item.balance}</Text>
      </View>
      <View style={styles.inventoryField}>
        <Text style={[styles.infoLabel, { color }]}>Email:</Text>
        <Text style={[styles.infoText, { color }]}>{item.email}</Text>
      </View>
      <View style={styles.inventoryField}>
        <Text style={[styles.infoLabel, { color }]}>Age:</Text>
        <Text style={[styles.infoText, { color }]}>{item.age}</Text>
      </View>
      {showMore && (
        <Text style={[styles.infoAbout, { color }]}>{item.about}</Text>
      )}
      <TouchableOpacity
        onMouseEnter={handleMouseEnterIn}
        onMouseLeave={handleMouseEnterOut}
        onPress={handleShowMore}
      >
        <Text
          style={[
            styles.viewDetail,
            { color, textDecorationLine: isHovered ? "underline" : "none" },
          ]}
        >
          Show {showMore ? "Less" : "More"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  const [filterText, setFilterText] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const handleFilterText = (text) => {
    setFilterText(text);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleSortPress = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const sortDataByDirection = (direction) => {
    if (direction === "asc") {
      return filteredData.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return filteredData.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Investor List</Text>
      <View style={styles.filterField}>
        <TextInput
          style={styles.filterInput}
          placeholder="Filter by name"
          value={filterText}
          onChangeText={handleFilterText}
          placeholderTextColor="#d3d4d5"
        />
        <TouchableOpacity onPress={handleSortPress} style={styles.sortButton}>
          {sortDirection === "asc" ? (
            <FaSortAmountDownAlt style={styles.sortIcon} />
          ) : (
            <FaSortAmountUpAlt style={styles.sortIcon} />
          )}
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ width: "80%" }}
        data={sortDataByDirection(sortDirection)}
        renderItem={({ item, index }) => <ListItem item={item} index={index} />}
        keyExtractor={(item) => item._id}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#123668",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff",
  },
  infoLabel: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4,
    marginRight: 10,
  },
  listItem: {
    padding: 10,
    width: "100%",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#e2d9e1",
  },
  infoText: {
    marginBottom: 5,
    fontSize: 20,
  },
  inventoryField: {
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
  },
  filterInput: {
    borderColor: "white",
    borderWidth: 1,
    color: "#ffffff",
    fontSize: 16,
    height: 40,
    marginRight: 20,
    paddingHorizontal: 8,
    outline: "none",
    width: "100%",
    outlineColor: "transparent",
  },
  viewDetail: {
    display: "flex",
    justifyContent: "flex-end",
  },
  infoAbout: {
    marginTop: 10,
  },
  filterField: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  sortIcon: {
    color: "white",
    fontSize: "30px",
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  lastItem: {
    marginBottom: 0,
  },
});