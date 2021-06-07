#(Binary Search Tree)

在计算机科学中**二叉搜索树**（BST），有时称为_有序或排序的二叉树_），
是一种特殊类型的容器：存储
“项目”（例如数字、名称等）的数据结构。 ） 在记忆中。允许快速搜索、
添加和删​​除项目，并可用于实现
动态项目集或查询表，允许您
通过其键值查找项目。例如，
按姓名查找某人的电话号码。

二叉搜索树保持其键值排序，对于
搜索和其他操作可以使用
二分搜索原理：在搜索树中的键值（或
插入新键的位置）时，它们从根到叶遍历树，
与存储在节点中的键进行比较树，然后
根据比较决定继续在右子树或
左子树中搜索。平均而言，这意味着每次比较都允许操作
跳过树的一半，因此每次搜索、插入或删除所花费的
时间与存储在
树中的项目数的对数成正比。这比查找所需的线性时间要好得多
项目按其在数组中的键值（未排序 - _unsorted_），但
比哈希表（_hash table_）上的类似操作慢得多。

长度为 9，深度为 3，根值为 8 的二叉树搜索。
![二叉搜索树](https://upload.wikimedia.org/wikipedia/commons/d/da/Binary_search_tree.svg)

## 基本操作的伪代码
### 插入

```txt
insert(value)
  Pre: value has passed custom type checks for type T
  Post: value has been placed in the correct location in the tree
  if root = ø
    root ← node(value)
  else
    insertNode(root, value)
  end if
end insert
``

```txt
insertNode(current, value)
  Pre: current is the node to start from
  Post: value has been placed in the correct location in the tree
  if value < current.value
    if current.left = ø
      current.left ← node(value)
    else
      InsertNode(current.left, value)
    end if
  else
    if current.right = ø
      current.right ← node(value)
    else
      InsertNode(current.right, value)
    end if
  end if
end insertNode

``

## 复杂性

### 时间复杂度

| 访问 | 搜索 | 插入 | 删除 |
| :-------: | :-------: | :-------: | :-------: |
| O(log(n)) | O(log(n)) | O(log(n)) | O(log(n)) |

### 空间复杂度

O(n