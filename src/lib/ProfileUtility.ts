import {decodeBase64Value} from "$lib/Base64Util";
import type {Metadata} from "../types/auth";
import {ZITADEL_RESOURCE_ID} from "$env/static/private";

export const rolesScope = `urn:zitadel:iam:org:project:${ZITADEL_RESOURCE_ID}:roles`
export const metadataScope = `urn:zitadel:iam:user:metadata`

export function decodeMetadatas(metadata: Metadata) {
    const decodedMetadata: Metadata = {};

    for (const key in metadata) {
        if (metadata.hasOwnProperty(key)) {
            decodedMetadata[key] = decodeBase64Value(metadata[key]);
        }
    }

    return decodedMetadata
}

export function getRoles(roles: Object) {
    return Object.keys(roles ?? [])
}