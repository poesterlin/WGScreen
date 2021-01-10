<script context="module">
  //   import { stores } from "@sapper/app";

  export async function preload(_, session) {
    // const event = (await axios.get(
    //   server + "events/upcoming?_limit=1",
    //   makeAuth(session)
    // )).data[0];

    return {};
  }
</script>

<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import { server, makeAuth } from "../helpers/env";

  let FileUpload;

  onMount(async () => {
    const { default: FilePond, registerPlugin, supported } = await import(
      "svelte-filepond"
    );
    FileUpload = FilePond;
    const { default: FilePondPluginImageExifOrientation } = await import(
      "filepond-plugin-image-exif-orientation"
    );
    const { default: FilePondPluginImagePreview } = await import(
      "filepond-plugin-image-preview"
    );

    registerPlugin(
      FilePondPluginImageExifOrientation,
      FilePondPluginImagePreview
    );
  });

  let pond;

  async function handleAddFile(err, fileItem) {
    console.log(pond.getFiles(), fileItem);
    const data = new FormData();
    data.append("files.image", fileItem.file, fileItem.file.name);
    data.append("data", JSON.stringify({}));

    await axios.post(server + "images", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
</script>

<style global>
  @import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
</style>

<svelte:component
  this={FileUpload}
  bind:this={pond}
  allowMultiple={true}
  onaddfile={handleAddFile} />
