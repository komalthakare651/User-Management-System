import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Swal from 'sweetalert2';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8081/users", {
      params: {
        q: searchTerm,
      },
    });
    setUsers(result.data);
  };
  const deleteUser = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8081/user/${id}`);
        loadUsers();
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
      }
    });
  };

  // const deleteUser = async (id) => {
  //   await axios.delete(`http://localhost:8081/user/${id}`);
  //   loadUsers();
  // };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadUsers();
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const displayedItems = filteredUsers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="container">
      <div className="py-4">
        <form class="d-flex" onSubmit={handleSearch}>
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button class="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <br />
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedItems.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{startIndex + index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <Pagination
            activePage={currentPage}
            totalItemsCount={users.length}
            itemsCountPerPage={itemsPerPage}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
    </div>
  );
}