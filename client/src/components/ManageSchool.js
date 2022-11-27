import { useAuth } from "../context/AuthProvider";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

function ManageSchool() {
  const user = useAuth().currentUser;
  console.log(user);
  return (
    <>
      <h3> Current Resources</h3>
      {user.id ? (
        user.school.locations
          .sort((a, b) => (a.building.id > b.building.id ? 1 : -1))
          .map((buildingInfo) => {
            return (
              <Container>
                <Row>
                  <h5>{buildingInfo.building.name}</h5>
                </Row>
                <Row>
                  <Table responsive="md">
                    <thead>
                      <th>Room</th>
                      <th className="text-center">Actions</th>
                    </thead>
                    <tbody>
                    {buildingInfo.rooms
                      .sort((a, b) => (a.id > b.id ? 1 : -1))
                      .map((room) => {
                        return (
                          <tr key={room.id}>
                            <td >{room.name}</td>
                            <td className="text-center">
                              <Button>Edit</Button>
                            </td>
                          </tr>
                        );
                      })}
                      </tbody>
                  </Table>
                </Row>
              </Container>
            );
          })
      ) : (
        <h4>Loading....</h4>
      )}
      <Button>Create New Building</Button>{" "}
      <Button>Create New Room</Button>
    </>
  );
}

export default ManageSchool;
