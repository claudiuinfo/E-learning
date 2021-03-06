import React, { Component } from "react";
import UploadService from "../services/upload-files.service";
import { useLocation } from "react-router-dom";
import { withRouter } from "react-router";

class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",

      fileInfos: [],
    };

   // const location = useLocation();
    console.log("Location ")
    console.log(props.location.state)
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];
    let ownerId = this.props.location.state.ownerId;
    let ownerRole = this.props.location.state.ownerRole;
    
    //currentFile = {...currentFile, ownerName: "marius", ownerRole: "teacher", postDate: "2021-09-28 00:45:00"}

    console.log(currentFile)

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(ownerId, ownerRole, currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
    } = this.state;

    return (
      <div>
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        <label className="btn btn-default">
          <input type="file" onChange={this.selectFile} />
        </label>

        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={this.upload}
        >
          Upload
        </button>

        <div className="alert alert-light" role="alert">
          {message}
        </div>

        {/*<div className="card">
          <div className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            {fileInfos &&
              fileInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
          </ul>
              </div>*/}

        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Owner Name</th>
              <th scope="col">Owner Role</th>
              <th scope="col">Post Date</th>
              <th scope="col">File</th>
            </tr>
          </thead>
          <tbody>
          {fileInfos &&
              fileInfos.map((file, index) => (
                <tr>
                <th scope="row">{index + 1}</th>
                <td>{file.ownerName}</td>
                <td>{file.ownerRole}</td>
                <td>{file.postDate}</td>
                <td><a href={file.url}>{file.name}</a></td>
              </tr>
              ))}
          </tbody>
        </table>

      </div>
    );
  }
}

export default withRouter(UploadFiles)
