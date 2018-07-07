import React from "react";
import axios, { post } from "axios";

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    e.target.reset();
    this.fileUpload(this.state.file).then(response => {});
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  fileUpload(file) {
    const url = "/api/upload/" + this.props.id;
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <h1>File Upload</h1>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default Image;
