import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  hitCount: number | null = null;
  private binUrl = 'https://api.jsonbin.io/v3/b/671bf4dbacd3cb34a89cf872';
  private headers = new HttpHeaders({
    'X-Master-Key': '$2a$10$0LXGuoJMHC1YJeLLNtUAsO3r.LZi.a/ya7RzX28C6GCVOXUUJ91jC',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.incrementHitCount().subscribe(() => {
      this.getHitCount().subscribe((count) => {
        this.hitCount = count;
      });
    });
  }

  getHitCount(): Observable<number> {
    return this.http.get<any>(this.binUrl, { headers: this.headers }).pipe(
      map((response) => response.record.count)
    );
  }

  incrementHitCount(): Observable<any> {
    return this.getHitCount().pipe(
      map((currentCount) => currentCount + 1),
      map((newCount) => {
        return this.http.put(
          this.binUrl,
          { count: newCount },
          { headers: this.headers }
        ).subscribe();
      })
    );
  }
}
