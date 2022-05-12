import axios, { AxiosInstance, AxiosResponse } from "axios";
import { catchError, from, map, Observable, of } from "rxjs";
import { Logger } from "./logger";

type MessageResponse = {
  name: string;
};

export class Sender {

  private readonly instance: AxiosInstance;
  private readonly token: string;
  private readonly projectId: string;
  private readonly logger: Logger;

  public constructor(logger: Logger, projectId: string, token: string) {
    this.logger = logger;
    this.token = token;
    this.projectId = projectId;
    const baseUrl = 'https://fcm.googleapis.com'
    this.instance = axios.create({ baseURL: baseUrl });
  }

  public sendMessage(message: string): Observable<string | undefined> {
    const data = {
      message: {
        notification : {
          title: "X", 
          body: message
        },
        token: "e4mYbLltSCWkVe17AS4J6G:APA91bFtkzWCx_6Jwczy7E5tE39H2N4-1E3OJDli472--H4VOOGCgJxQyI6UJivPi4_kzNSBXvF2G7PN2ekAudty3_zvgogwk_iB2R_OGnw9OqrS2XrS-GT-l4f8mhEbMan7f-MztKKI"
      }
    };
    const messageResponse$ = from(this.mountPostRequest<MessageResponse>(data)).pipe(
      map((ax) => ax.data)
    );
    const name$ = messageResponse$.pipe(
      catchError(err => {
        this.logger.log(`SND ERROR: ${err.toString()}`);
        return of(undefined)
      }),
      map((mr) => mr ? mr.name : undefined)
    );
    return name$;
  }

  private mountUrl(): string {
    const url = `https://fcm.googleapis.com/v1/projects/${this.projectId}/messages:send`;
    return url;
  }

  private mountPostRequest<MessageResponse>(data: object): Promise<AxiosResponse<MessageResponse, any>> {
    const auth = `Bearer ${this.token}`;
    const pth = this.mountUrl();
    this.logger.logUrl(pth);
    return this.instance.post<MessageResponse>(pth, data, { headers: { Authorization: auth,  "Content-Type" : "application/json"} });
  }

}