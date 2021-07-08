import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { MyValidators } from "./my.validators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  versionKey: any;

  frameworks = {
    angular: "angular",
    react: "react",
    vue: "vue",
  };

  frameworkVersions = {
    angular: ["1.1.1", "1.2.1", "1.3.3"],
    react: ["2.1.2", "3.2.4", "4.3.1"],
    vue: ["3.3.1", "5.2.1", "5.1.3"],
  };

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      surname: new FormControl("", Validators.required),
      email: new FormControl(
        "",
        [Validators.email, Validators.required],
        [MyValidators.uniqEmail]
      ),
      technology: new FormGroup({
        framework: new FormControl("angular", Validators.required),
        frameworkVersion: new FormControl("1.1.1", Validators.required),
      }),
      skills: new FormArray([], Validators.required),
    });
  }

  submit() {
    if (this.form.valid) {
      console.log("Form: ", this.form);
      const formData = { ...this.form.value };
      console.log("Form Data:", formData);

      this.form.reset();
    }
  }

  setVersion() {
    // const frameworkVersions = {
    //   // angular: ["1.1.1", "1.2.1", "1.3.3"],
    //   // react: ["2.1.2", "3.2.4", "4.3.1"],
    //   // vue: ["3.3.1", "5.2.1", "5.1.3"],
    // };

    this.versionKey = this.form.get("technology").get("framework").value;
    const version = this.frameworkVersions[this.versionKey];

    this.form.patchValue({ framework: { version } });
  }

  addSkill() {
    const control = new FormControl("", Validators.required);
    (this.form.get("skills") as FormArray).push(control);
  }
}
